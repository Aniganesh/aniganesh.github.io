import React from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";


const BlogPost: React.FC = () => (
  <main className="portfolio-shell writing-shell">
    <div className="ambient ambient-one" />
    <div className="ambient ambient-two" />
    <div className="star-field" aria-hidden="true" />
    <header className="writing-header">
      <a href="/" className="writing-back"><ArrowLeft size={16} /> Portfolio</a>
      <span>ENGINEERING NOTES / 01</span>
    </header>
    <article className="writing-article">
      <p className="writing-kicker">Retrieval · Evaluation · LLM systems</p>
      <h1>Evaluating Gemini and Claude on the same RAG task</h1>
      <p className="writing-deck">A practical account of the question, the retrieval pipeline, the controls that made a comparison possible, and what one 40-question run can—and cannot—tell us.</p>
      <div className="writing-byline"><span>ANIRUDDHA GANESH</span><span>14 OCTOBER 2026</span><span>9 MIN READ</span></div>

      <p className="writing-intro">A model comparison is only useful when the models face the same task. I built an RFP-answering harness that retrieves evidence once, gives the same passages and instructions to Gemini and Claude, and keeps the inputs, outputs, citations and checks available for inspection.</p>

      <h2>Start with an existing RFP workflow</h2>
      <p>The task came from work I had done on the RFP workflow at ClinchIt. I extracted the RFP answer prompt, context formatting, answer and source parser, and generic fixtures from that codebase. I then adapted those pieces into a separate harness with dependency-injected model calls and an explicit grounding and citation protocol.</p>
      <p>This distinction matters: the historical product work supplied the starting point, while the retrieval pipeline, evaluation runner, public-source questionnaire and results described here are a new experiment. No customer proposals, customer data, credentials, production configuration or environment files went into the evaluation repository.</p>

      <h2>Build the retrieval path</h2>
      <p>The example corpus is public material from <a href="https://indic-games.in" target="_blank" rel="noreferrer">Indic Games</a> and my <a href="https://profile.indic-games.in" target="_blank" rel="noreferrer">engineering portfolio</a>. Reingestion opens a fresh Cloudflare Browser Run session, executes the pages’ JavaScript, and collects the rendered content. It also opens the portfolio’s About, project and Toolkit panels so their text is included. If live rendering fails, ingestion fails; it does not silently fall back to an earlier scrape.</p>
      <p>For the recorded run, the browser captured 18 views: four Indic Games pages and fourteen portfolio views. The pipeline normalized the text and split each rendered page into passages of up to 1,200 characters with 180 characters of overlap. It embedded those passages with Gemini’s <code>gemini-embedding-001</code> model at 768 dimensions and indexed them in a dedicated Pinecone namespace. That capture produced 26 chunks.</p>
      <p>For each question, the harness embeds the query, retrieves up to five passages with a minimum similarity score of 0.35, and records the passage IDs, text, source URLs, content hashes and similarity scores. A new source generation is made active only after its chunks are indexed. Retrieval filters against the active content hashes, so a previous generation does not leak into a new run.</p>

      <h2>Hold the comparison steady</h2>
      <p>The critical control is shared retrieval. The harness retrieves once per question, then sends that same evidence set, system instruction and question to both providers. Both calls run concurrently. Model-specific REST adapters normalize the request settings, including temperature 0.1 and a 4,096-token output limit.</p>
      <p>Answers must follow a small output contract: an answer, a source label, and a JSON array containing the exact IDs of cited passages. If retrieved evidence does not support a response, the model must return a canonical abstention and no evidence citations. The instructions also tell the models to treat retrieved text as untrusted data rather than as instructions.</p>
      <p>This setup controls the evidence and task presented to the two models. It does not eliminate every source of variation: provider APIs and model implementations differ, and a single response can vary across repeated calls. The experiment is a practical, inspectable comparison—not a claim that every model behavior has been controlled.</p>

      <h2>Make the questionnaire exercise both answering and restraint</h2>
      <p>The saved sample contains 40 questions: 28 supported fact requests and 12 deliberately unsupported requests. Supported examples ask about public project descriptions and technologies. Unsupported examples probe for facts the sources do not establish, such as contractual uptime, audited revenue, private credentials and healthcare certifications.</p>
      <p>Several questions ask about the same facts in different ways. That gives the sample useful regression coverage, but it does not make 40 independent benchmark tasks. The expected facts and abstention labels are used by the checker and are not included in the model’s prompt.</p>

      <h2>Check the contract, then inspect the answer</h2>
      <p>Automated checks look at output structure, whether citation IDs belong to the supplied evidence, required phrase coverage, and whether labeled unsupported requests receive the expected abstention. The interface resolves each model-emitted citation ID against that model’s saved retrieval set and displays the full passage supplied on that call.</p>
      <p>A valid citation ID only proves that the model selected a passage it received; it does not prove that the passage supports every sentence. Phrase coverage is also a proxy, not a semantic judge. The saved raw outputs, exact evidence, requests and failed checks are therefore part of the result, so a person can review what the automatic checks cannot establish.</p>

      <h2>One recorded run</h2>
      <p>On 13 October 2026, the harness completed 80 provider calls across the 40-question sample with no provider errors:</p>
      <div className="writing-table-wrap"><table className="writing-results"><thead><tr><th>Model</th><th>Checks passed</th><th>Unsupported requests declined</th><th>Mean inference time</th></tr></thead><tbody>
        <tr><th>Gemini 2.5 Flash</th><td>37 / 40</td><td>12 / 12</td><td>1.39 s</td></tr>
        <tr><th>Claude Sonnet 4.5</th><td>39 / 40</td><td>12 / 12</td><td>2.07 s</td></tr>
      </tbody></table></div>
      <p>Four responses were flagged. Both models answered a broad ClinchIt question with cited evidence about my documented contributions, but missed phrases required by its rubric. That question may mix product capabilities with an individual’s contributions, so the rubric needs human review. Gemini’s other two flagged answers were factually correct but used malformed response markup; one also returned citation objects instead of the required array of ID strings. The original outputs and failed checks remain in the record.</p>
      <p>The latency figures cover model inference only. They exclude browser rendering, embedding and retrieval. The result is one run, with repeated facts in the question set, and should not be read as a statistical model ranking or an accuracy score.</p>

      <h2>What I wanted the harness to make visible</h2>
      <p>When an RFP answer is wrong or incomplete, the useful debugging question is not only “which model?” It is also: what did retrieval return, what did the model actually receive, which passage ID did it cite, did it follow the response contract, and what did the checker miss? Keeping those artifacts together makes it possible to trace a result from rendered source to model output and reviewer judgment.</p>
      <p>The next step for a stronger evaluation would be a reviewed rubric with unambiguous question intent, more independent tasks, and repeated trials. That would improve the evidence behind any model comparison. For now, the harness is a small engineering demonstration of shared-context RAG evaluation, live ingestion and inspectable failure analysis.</p>

      <aside className="writing-callout"><strong>Inspectability is part of the method</strong><span>The companion evaluation interface keeps the saved run beside the side-by-side answers, exact retrieved chunks, raw model inputs and outputs, and exportable human-review data.</span></aside>
      <footer className="writing-footer"><a href="/">← Back to the portfolio</a><a href="https://github.com/aniganesh" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a></footer>
    </article>
  </main>
);

export default BlogPost;
