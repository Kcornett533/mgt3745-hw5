export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/entries") {
      if (request.method === "GET") {
        try {
          const { results } = await env.DB.prepare(
            "SELECT * FROM entries ORDER BY id DESC"
          ).all();
          return new Response(JSON.stringify(results), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      if (request.method === "POST") {
        try {
          const body = await request.json();
          const { pipelineName, executionParams, fileSignature, notes } = body;

          // Validate required fields
          if (!pipelineName || !executionParams || !fileSignature) {
            return new Response(
              JSON.stringify({ error: "Missing required fields" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          // Validate 64-character hex signature
          const hex64Regex = /^[a-fA-F0-9]{64}$/;
          if (!hex64Regex.test(fileSignature)) {
            return new Response(
              JSON.stringify({ error: "fileSignature must be a 64-char hex string" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          const query = `
            INSERT INTO entries (pipelineName, executionParams, fileSignature, notes)
            VALUES (?, ?, ?, ?)
          `;
          await env.DB.prepare(query)
            .bind(pipelineName, executionParams, fileSignature, notes || "")
            .run();

          return new Response(
            JSON.stringify({ message: "Entry created successfully" }),
            { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } catch (err) {
          return new Response(
            JSON.stringify({ error: err.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};