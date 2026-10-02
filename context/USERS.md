# User research and jobs


### INT-01
INT-01 | Undergraduate Researcher, BME Optics & Imaging Lab | September 7, 2026  

What happened and the participant's workaround: While preparing a manuscript for submission, a graduate researcher anticipated that reviewers would push back on a section about their custom cell-segmentation pipeline. To ensure that the paper showed integrity to the reviewer, INT-01 spent three days before review organizing raw .tiff files with timestamped execution logs to upload to a publi repository.  

What was reported: The data clean-up took up the entirety of his required 10 hours a week of lab time in the week leading up to send off. This time took away from actual wet-lab experiments.  

What I observed: He stated that he learned preemptive actions such as this data cleaning were common, but also thought they were largely a waste of time.  

What I inferred: Academic labs spend a lot of time and effort preemptively supplying proof of integrity to reviewers because there is no way to definitively prove the trustworthiness of the data, so they want to leave as little doubt as possible.  

Evidence that confirms, challenges, or leaves the framing uncertain: It confirms that the integrity of the data is an important factor to consider before sending in a  submission, but challenges that the friction caused by the data is mostly apparent after being sent back by a reviewer.

### INT-02
INT-02 | Senior Industry Research Lead & Startup Executive | September 9, 2026  

What happened and the participant's workaround: Submitted a manuscript that contained findings that challenged the status quo of tissue storage. The primary reviewer accepted the paper into the journal, but left comments (can be viewed by readers) that suggested that many of the results could have been due to an artefact, noise, or an improper signal threshold. In order to bolster credibility of the data, INT-02's workaround was collaborating with an external academic lab to redo much of the experimentation. They spent many weeks on generating a validation of the dataset before resubmitting the paper to the same journal.  

What was reported: Stated that when findings challenge established scientific consensus, standard protocol isn't enough. Reviewers expect extra validation, especially when data is tied to corporate entities.  

what I observed: Seemed frustrated when recalling the weeks of delay and logistics required to nullify the skepticism.  

What you inferred: Researchers face great time and financial demands proving cutting edge data validity because they lack the tools to verify protocol execution internally.  

Evidence that confirms, challenges, or leaves the framing uncertain: Confirms that proving raw data validity for novel science is one of the primary publication obstacles.

## Job statements
JOB-01: When preparing a manuscript with custom data pipelines, I want to automatically generate an immutable data manifest, so I can eliminate manual file packaging and defend pipeline integrity before submission.
Evidence: INT-01 spent over 20 hours manually zipping raw TIF files, writing READMEs, and logging script parameters before manuscript submission.

JOB-02: When unconventional scientific findings face reviewer pushback, I want to instantly provide verified execution lineages and baseline data, so I can validate raw data integrity without delayed, costly external re-runs.
Evidence: INT-02 lost six weeks and R&D budget commissioning an external lab re-run after a reviewer questioned custom assay thresholds.

## User profiles
PROFILE-01: Undergraduate Academic Researcher
* **Relevant role:** Undergraduate / Graduate Researcher in a Biomedical Optics & Imaging Laboratory.
* **Circumstances:** Regularly processes lots of microscopy data using custom-built scripts and prepares data packages for peer-reviewed journal submissions.
* **Needs:** An automated way to track script execution parameters and turn raw data into a standardized package without interrupting wet-lab experiments.
* **Constraints:** No formal software engineering background and reliance on open source file platforms.
* **Evidence IDs:** INT-01, JOB-01
* **Profile Insights:**
  * *Reported:* Spends up to 10 hours per submission cycle manually organizing raw .tiff files, writing README documentation, and logging script execution parameters.
  * *Observed:* Not a fan of pre-submission file packaging, viewing it as necessary but tedious.
  * *Inferred:* Student researchers want to share verifiable raw data, but the lack of tools makes manual prep a major productivity obstacle.
PROFILE-02: relevant role, circumstances, needs, constraints, and evidence IDs.

PROFILE-02: Senior R&D Lead & Industry Executive
* **Relevant role:** CEO of a Biotechnology R&D Firm.
* **Circumstances:** Manages research and clinical validation studies that frequently feature nonstandard experimental protocols.
* **Needs:** A method to export immutable evidence, raw baseline data, and protocol lineages to satisfy peer reviewers without massive project delays.
* **Constraints:** Strict project milestones, tight R&D budgets, and the need to protect algorithms or trade secrets while proving raw data validity.
* **Evidence IDs:** INT-02, JOB-02
* **Profile Insights:**
  * *Reported:* Encountered a few weeks timeline delay and unbudgeted R&D expenses when comissioning external lab reruns to satisfy reviewer doubts.
  * *Observed:* Emphasizes that papers advancing nonstandard or unconventional methodology face a burden of proof regarding data validity.
  * *Inferred:* Senior research managers will invest in internal data auditing tools if it avoids costly revision cycles.
  ## Primary user

* **Name & Role:** Dr. Alex Chen, Computational Biology Researcher
* **Goal:** Record and verify experimental pipeline execution parameters, dataset versions, and 64-character SHA-256 cryptographic file signatures during analysis runs.
* **Friction:** Frequently switches between lab workstations and personal laptops where local storage drops state, risking lost metadata or mismatched analytical provenance.
* **Environment:** Multi-monitor Linux workstations and personal laptops in a university research laboratory.

## Secondary user

* **Name & Role:** Morgan Vance, Peer Auditor / Journal Reviewer
* **Goal:** Quickly search, filter, and audit submitted data provenance entries to verify computational reproducibility without running manual database queries or inspecting raw backend logs.
* **Friction:** Encounters cluttered, non-searchable log dumps that make cross-referencing pipeline parameters time-consuming and error-prone.
* **Environment:** Reviewing submitted paper supplementary materials from a remote office display.

## Journey

```mermaid
journey
  title Provenance Logging & Auditing Session
  section Arrive
    Opens Provenance Logger web page: 4: Primary, Secondary
    Fetches stored D1 entries from Worker: 5: Primary, Secondary
  section Act
    Submits pipeline parameters & file signature: 5: Primary
    Filters existing entries in real time: 4: Secondary
  section Return
    Accesses dashboard from secondary lab workstation: 5: Primary
    Verifies entries persisted across cache resets: 5: Secondary