export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
          let body = {};
          try {
            body = await request.json();
          } catch (e) {
            body = {};
          }

          const { pipelineName, executionParams, fileSignature, notes, manifestId } = body;

          // Reject if required fields are missing
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
              JSON.stringify({ error: "fileSignature must be a 64-character hex string" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          // Provide fallback for manifest_id if not supplied
          const manifest_id = manifestId || body.manifest_id || `manifest-${Date.now()}`;

          const query = `
            INSERT INTO entries (manifest_id, pipeline_name, execution_params, file_signature, notes)
            VALUES (?, ?, ?, ?, ?)
          `;
          await env.DB.prepare(query)
            .bind(manifest_id, pipelineName, executionParams, fileSignature, notes || "N/A")
            .run();

          return new Response(
            JSON.stringify({ message: "Entry created successfully" }),
            { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } catch (err) {
          return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};
