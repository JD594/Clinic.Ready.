const $=s=>document.querySelector(s);const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const storeKey='clinic-ready-v1';let state={};try{state=JSON.parse(localStorage.getItem(storeKey)||'{}')}catch{};function save(){localStorage.setItem(storeKey,JSON.stringify(state));updateProgress()}function updateProgress(){let n=DATA.modules.filter((m,i)=>state['done'+i]).length;$('#overall').textContent=n+' / 6 modules'}function nav(){let items=[['home','⌂','Home'],['guide','?','Learner guide'],...DATA.modules.map((m,i)=>['module-'+i,String(i+1).padStart(2,'0'),m.name]),['explore','◇','Explore further'],['references','↗','References'],['feedback','☆','Feedback']];$('#nav').innerHTML=items.map(([id,num,name])=>`<button class="navbtn" data-go="${id}"><span class="navnum">${num}</span><span>${escapeHTML(name)}</span></button>`).join('');document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go))}function go(id){location.hash=id;render();window.scrollTo(0,0)}function render(){let id=decodeURIComponent(location.hash.slice(1)||'home');document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.go===id));if(id==='home')home();else if(id==='guide')guide();else if(id.startsWith('module-'))modulePage(Number(id.split('-')[1]));else if(id==='explore')exploreFurther();else if(id==='references')references();else if(id==='feedback')feedback();else home();updateProgress()}function home(){let done=DATA.modules.filter((m,i)=>state['done'+i]).length;$('#view').innerHTML=`<div class="home-page"><div class="home-masthead"><div class="home-masthead-top"><span>CLINIC READY</span><span>AN INDEPENDENT LEARNING RESOURCE &nbsp; / &nbsp; 2026</span></div><div class="home-hero-grid"><div><div class="home-kicker">PRIVATE PRACTICE PREPARATION</div><h1>Beyond the<br><em>treatment room.</em></h1><p class="home-intro">A practical guide to the business side of physiotherapy, developed for students preparing to enter private practice.</p><div class="home-actions"><button class="home-primary" data-go="module-0">Begin the course <span aria-hidden="true">↗</span></button><button class="home-textlink" data-go="guide">Read the learner guide <span aria-hidden="true">→</span></button></div></div><div class="home-aside"><span class="home-aside-number">01—06</span><div class="home-aside-line"></div><p>Six focused modules.<br>Realistic workplace decisions.<br>One transition into practice.</p><span class="home-aside-caption">LEARN AT YOUR OWN PACE</span></div></div><div class="home-masthead-bottom"><span>AN INTRODUCTION TO THE NON-CLINICAL SIDE OF PRACTICE</span><span>SCROLL TO EXPLORE ↓</span></div></div><div class="home-section-head"><div><div class="home-kicker">COURSE CONTENT</div><h2>The six modules</h2></div><div class="home-section-note">Select a topic to explore its lessons, scenarios and knowledge checks.</div></div><div class="home-module-list">${DATA.modules.map((m,i)=>`<button class="home-module-row" data-go="module-${i}"><span class="home-module-no">${String(i+1).padStart(2,'0')}</span><span class="home-module-title">${escapeHTML(m.name)}</span><span class="home-module-status">${state['done'+i]?'COMPLETED':'EXPLORE'}</span><span class="home-module-arrow" aria-hidden="true">↗</span></button>`).join('')}</div><div class="home-bottom"><div class="home-bottom-main"><div class="home-kicker">HOW TO USE CLINIC READY</div><h2>Learn the principles.<br>Apply them in practice.</h2><p>Start with a short knowledge check, work through the learning material and case activities, then review what you've learned.</p><button class="home-textlink" data-go="guide">How the toolkit works <span aria-hidden="true">→</span></button></div><div class="home-progress"><span class="home-progress-label">YOUR PROGRESS</span><strong>${done}<small> / 6</small></strong><div class="home-progress-track"><div style="width:${done/6*100}%"></div></div><p>Modules completed on this device</p><button class="home-textlink" data-go="feedback">Provide feedback →</button></div></div><p class="home-disclaimer">EDUCATIONAL RESOURCE — Financial examples are fictional. Consult current Australian professional guidance and workplace policies when applying these concepts.</p></div>`;bindGo()}
function guide(){$('#view').innerHTML=`<span class="eyebrow">GETTING STARTED</span><h1 style="font-family:Georgia,serif;font-size:46px">Your learner guide</h1><p class="muted">Clinic Ready is a self-paced educational toolkit for final-year physiotherapy students and new graduates preparing for private practice.</p><div class="grid"><div class="card"><div class="moduleindex">STEP 01</div><h3>Check what you know</h3><p>Complete the six-question pre-module knowledge check without viewing the answers.</p></div><div class="card"><div class="moduleindex">STEP 02</div><h3>Explore & practise</h3><p>Read the evidence-informed lessons, complete activities and consider the suggested responses.</p></div><div class="card"><div class="moduleindex">STEP 03</div><h3>Review & reflect</h3><p>Repeat the quiz, compare your results, complete the workplace checklist and record a takeaway.</p></div></div><div class="guidepanel"><div><h2>Designed for the transition into practice</h2><p>Each module connects foundational business concepts to realistic decisions faced by early-career physiotherapists.</p><button class="btn" data-go="module-0">Begin Module 1 →</button></div><div><h3>Your privacy</h3><p>Notes, quizzes and progress remain in your browser. No responses are sent to the project creator. You can export your data from the Feedback page.</p><h3>How long does it take?</h3><p>Allow approximately 35–45 minutes per module, depending on your pace.</p></div></div>`;bindGo()}
function bindGo(){document.querySelectorAll('#view [data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go))}
function modulePage(i){const m=DATA.modules[i];if(!m){home();return}$('#view').innerHTML=`<div class="eyebrow" style="color:#007d79">MODULE ${i+1} OF 6</div><h1 style="font-size:36px;line-height:1.2">${escapeHTML(m.name)}</h1><p class="muted">Work through the original learning material and activities. Your notes and scores are stored on this device.</p><div class="tabs"><button data-tab="pre">1 · Pre-check</button><button data-tab="learn">2 · Lessons & activities</button><button data-tab="post">3 · Post-check</button><button data-tab="wrap">4 · Reflection</button></div><div id="tabbody"></div>`;let tab=state['tab'+i]||'pre';function switchTab(t){tab=t;state['tab'+i]=t;save();document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));if(t==='learn')lessonView();else if(t==='wrap')wrapView();else quizView(t)}document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));function quizView(t){let pre=t==='pre';let q=m.quiz;let completed=state['submitted-'+i+'-'+t];$('#tabbody').innerHTML=`<div class="lesson"><h2>${pre?'Before you begin':'After completing the lessons'}</h2><p>Answer six questions. ${pre?'Your first score is recorded without revealing the correct answers.':'After submitting, you can review the answer key and compare your scores.'}</p>${q.map((x,k)=>`<div class="quizitem"><strong>Question ${x.n}</strong><p>${escapeHTML(x.text)}</p><div class="choices">${'ABCD'.split('').map(letter=>`<label class="choice-option"><input type="radio" name="q${k}" value="${letter}" ${state['q-'+i+'-'+t+'-'+k]===letter?'checked':''}><span><b>${letter}.</b> ${escapeHTML(x.options?.[letter]||'Option text unavailable in source')}</span></label>`).join('')}</div></div>`).join('')}<button class="btn" id="submitQuiz">${completed?'Update score':'Submit answers'}</button><div id="quizResult"></div></div>`;q.forEach((x,k)=>document.querySelectorAll(`input[name=q${k}]`).forEach(r=>r.onchange=()=>{state['q-'+i+'-'+t+'-'+k]=r.value;save()}));$('#submitQuiz').onclick=()=>{let vals=q.map((_,k)=>state['q-'+i+'-'+t+'-'+k]);if(vals.some(v=>!v)){alert('Please answer all six questions first.');return}state['submitted-'+i+'-'+t]=true;state['score-'+i+'-'+t]=vals.filter((v,k)=>v===m.answers[String(q[k].n)]).length;save();quizView(t)};if(completed){let score=state['score-'+i+'-'+t];$('#quizResult').innerHTML=`<div class="result"><strong>Your ${pre?'pre':'post'}-check score: ${score} / ${q.length}</strong>${!pre?`<p>Pre-check: ${state['score-'+i+'-pre']??'not completed'} / 6 · Post-check: ${score} / 6</p><p>Answer key: ${Object.entries(m.answers).map(([k,v])=>`${k}: ${v}`).join(' · ')}</p>`:'<p>Answers will be revealed after the post-check.</p>'}</div>`}}
function lessonView(){
const blocks=m.blocks;
let cut=blocks.findIndex(b=>b.type==='p'&&b.text.includes('Pre and Post Module Knowledge Check'));
if(cut<0)cut=blocks.length;
let htmlOut='<div class="reading-flow">';
let activity=0, response=0, inAnswer=false, answerText='', pendingQuestion=false;let currentList=null;const closeList=()=>{if(currentList){htmlOut+=currentList==='number'?'</ol>':'</ul>';currentList=null}};
const clean=t=>t.replace(/_{5,}/g,'').replace(/(?:\n\s*){3,}/g,'\n\n').trim();
const answerHeading=t=>/^(?:Suggested (?:response|answer|approach|plan)|Sample (?:response|answer)|Model (?:response|answer)|Answer\s*[:–-]|A\s*[–:-]\s+)/i.test(t.trim());
const promptMarker=t=>/^(?:Your (?:response|answer|calculation|task|reflection|draft|goal)|Write (?:your|a short) response|Your thoughts)\s*[:–-]?/i.test(t.trim());
const sectionHeading=t=>/^(?:[1-9]\. (?!Ask |Explain |Discuss |Agree |Check |Confirm |Listen |Acknowledge |Clarify |Escalate |Document |Consent:|Sender identification:|Unsubscribe functionality:)|Learning outcomes|Why is this topic relevant|How to Complete|Clinical Application|Workplace Checklist|First Week on the Job Checklist)/i.test(t);
const subHeading=t=>t.length<105 && !/[.!?]$/.test(t) && !/^\*?NB\b/i.test(t) && !/^(?:Example:|Q\s*[–:-]|A\s*[–:-])/i.test(t) && (/[–:]$/.test(t)||/^(?:Profit ≠ Cash|Break even calculation|Understanding |How |What |Why |When |Before |Start with |Employment status|A percentage|Patient Scenario|Scenario:|First Week|Your Task|Key considerations|Key principles|Practical application|Clinical Application|Check your understanding|So, what should|The role of |Types of |The importance of |Managing |Responding |Using |Developing |Communicating |Financial |Marketing |Technology |Privacy |Risk |Quality |Ethical )/i.test(t));
const responseBox=()=>{
 const key='response-'+i+'-'+(++response);
 return `<div class="response-panel"><label for="${key}">Your response</label><p class="response-help">Write your answer before revealing the suggested response.</p><textarea id="${key}" data-response="${key}" placeholder="Type your response here…">${escapeHTML(state[key]||'')}</textarea><button class="btn secondary reveal-btn" data-reveal="${key}" ${!(state[key]||'').trim()?'disabled':''}>Reveal suggested answer ↓</button><div class="suggested-answer" id="answer-${key}" hidden></div></div>`;
};
let lastKey=null;let answerRemaining=0;let answerSourceIndex=-1;
const forcedEnds={0:{111:115},1:{179:180,190:194,204:208},2:{154:154,257:258,303:307},3:{346:350},4:{252:257},5:{78:80,102:102,115:116,185:187}};let forcedEnd=-1;
const boldTitles=new Set(['Evaluate the role before accepting it','Recognising your current competence','Reception is part of the care team','Staff changes and continuity','Why does supervision matter?','Distinguishing different kinds of support','Establishing a Supervision Agreement','Prepare for a session','Why does feedback matter?','Turning feedback into an actionable plan','Supervision and formal performance review','Reasonable Management Action and Workplace Bullying','Workload and Psychosocial Hazards','Recognising When Workload May Be Unsustainable','Disagreement, constructive feedback or bullying','Raising Workplace Concerns Safely','Clarify out of hours contact']);
const editorialBoldByModule={
0:new Set(['How can you explain fees to a patient?']),
3:new Set(['Introduction','The risk of copying previous notes','My Health Record as a separate system','Accessing my health record appropriately','Why does privacy matter?','Consent and Lawful Information Sharing','What is Telehealth?','What does the research tell us?','What does this mean for you?','Why use it?','Evaluate before recommending','Digital Accessibility and Patient Centred Care','How to improve accessibility?','A resource review checklist','What is cybersecurity and why does it matter in physiotherapy?','What can you do to protect yourself?']),
4:new Set(['Introduction','The Patient Journey','Closed-loop communication','A handy template','Importance of reminders','Organise the day','Record, retention and deletion','A practical pre claim check to complete','Medicare example – GP Chronic Condition Management Plans','Referral requirements','Service Requirements','Reporting requirements','Medicare provider numbers','Private health insurance','Other funding schemes','Daily Checklist and Improvement Worksheet']),
5:new Set(['Introduction','The Four Principles of Healthcare Ethics','Recognising commercial conflicts of interest','A decision sequence','Review Performance in Context','Treatment Packages and Informed Choice','Consumer rights and refunds','Respond to cost concerns','Referral choices and financial interest','Conflict review record','Maintaining Professional Boundaries','A practical way to raise concerns'])
};
const numberedInstructionRanges={3:[[123,127],[164,168],[207,213],[236,259],[317,321],[325,331]],4:[[51,55]]};
const majorNumberedSections={
3:new Set([18,78,128,169,221,283,337,376]),
4:new Set([13,63,117,160,225,243,289]),
5:new Set([14,71,85,110,130,153])
};
const isInstructionStep=(moduleIndex,blockIndex,t)=>(
 moduleIndex>=3 && /^\d+\.\s/.test(t) && !(majorNumberedSections[moduleIndex]||new Set()).has(blockIndex)
);
const module6Steps=new Set(['Step 1 — Identify the decision','Step 2 — Consider the patient','Step 3 — Identify competing interests','Step 4 — Compare reasonable options','Step 5 — Decide, explain and seek support']);
const smallTitles=new Set(['1. Clinical supervision','2. Caseload and workload','3. Induction and professional development','4. Employment expectations','1. Identify a priority question','2. Summarise the relevant information','3. Explain what you have considered','4. Clarify the decision or skill requiring support','5. Agree on the next step','1. Identify the concern','2. Record relevant information','3. Identify an appropriate contact','4. Use an alternative pathway when necessary','5. Ask about the process','6. Escalate urgent concerns promptly']);
function flushAnswer(){
 if(!inAnswer)return;
 if(lastKey && answerText.trim()){
  const compactAnswer=(i===0 && answerSourceIndex===111)?`<p>${answerText.replace(/<\/p>\s*<p>/g," ")}</p>`.replace("<p><p>","<p>").replace("</p></p>","</p>"):answerText;
  const slot=`<div class="suggested-inner"><strong>Suggested answer</strong>${compactAnswer}</div>`;
  htmlOut=htmlOut.replace(`id="answer-${lastKey}" hidden></div>`,`id="answer-${lastKey}" hidden>${slot}</div>`);
 }else if(answerText.trim()){htmlOut+=`<div class="answer-inline">${answerText}</div>`}
 inAnswer=false;answerText='';
}
const finalScenarioRanges={0:[102,115],1:[195,208],2:[294,307],3:[337,350],4:[243,257],5:[179,187]};
const scenarioRange=finalScenarioRanges[i];
const scenarioAnswers={0:111,1:204,2:303,3:346,4:252,5:185};
const scenarioPrompts={0:[106,107,108,109],1:[199,200,201,202],2:[298,299,300,301],3:[341,342,343,344],4:[247,248,249,250],5:[183]};
const scenarioStarts={0:102,1:195,2:294,3:337,4:243,5:179};
const scenarioTitleIndices={0:[102,103],1:[195,196],2:[294,295],3:[337,338],4:[243,244],5:[179,180]};
for(const [blockIndex,b] of blocks.slice(0,cut).entries()){
 if(scenarioRange && blockIndex===scenarioStarts[i]){
  flushAnswer();closeList();lastKey=null;
  const [start,end]=scenarioRange;
  const a=scenarioAnswers[i];
  const titles=scenarioTitleIndices[i];
  const scenarioIntroStart=titles[1]+1;
  const intro=blocks.slice(scenarioIntroStart,a).filter((x,k)=>{
    const ix=scenarioIntroStart+k;
    return ix<scenarioPrompts[i][0] && !/^(Your task|Your Task|Your Task –)$/i.test(clean(x.text||''));
  });
  const tasks=scenarioPrompts[i].map(ix=>clean(blocks[ix].text));
  const answer=blocks.slice(a+1,end+1).map(x=>`<p>${escapeHTML(clean(x.text))}</p>`).join('');
  const key='response-'+i+'-'+(++response);
  htmlOut+=`<section class="final-scenario"><h2 class="reading-heading">${escapeHTML(clean(blocks[titles[0]].text))}</h2><h3 class="reading-subheading">${escapeHTML(clean(blocks[titles[1]].text))}</h3>`;
  for(const item of intro){const t=clean(item.text||'');if(t && !promptMarker(t))htmlOut+=`<p class="reading-paragraph">${escapeHTML(t)}</p>`}
  htmlOut+=`<p class="reading-subheading"><strong>Your task</strong></p><ul class="reading-list">${tasks.map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul>`;
  htmlOut+=`<div class="response-panel"><label for="${key}">Your response</label><p class="response-help">Complete the tasks above before revealing the suggested answer.</p><textarea id="${key}" data-response="${key}" placeholder="Type your response here…">${escapeHTML(state[key]||'')}</textarea><button class="btn secondary reveal-btn" data-reveal="${key}" ${!(state[key]||'').trim()?'disabled':''}>Show suggested answer</button><div class="suggested-answer" id="answer-${key}" hidden><div class="suggested-inner"><strong>Suggested answer</strong>${answer}</div></div></div></section>`;
  continue;
 }
 if(scenarioRange && blockIndex>scenarioRange[0] && blockIndex<=scenarioRange[1])continue;

 if(inAnswer && forcedEnd>=0 && blockIndex>forcedEnd){flushAnswer();lastKey=null;forcedEnd=-1}
 if(!b.listType)closeList();
 if(b.type==='table'){flushAnswer();lastKey=null;htmlOut+=`<div class="reading-table"><table>${b.rows.map(r=>'<tr>'+r.map(c=>`<td>${escapeHTML(c).replace(/\n/g,'<br>')}</td>`).join('')+'</tr>').join('')}</table></div>`;continue}
 let t=clean(b.text);if(!t)continue;
 if(b.listType){if(inAnswer){flushAnswer();lastKey=null}if(currentList!==b.listType){closeList();currentList=b.listType;htmlOut+=currentList==='number'?'<ol class="reading-list">':'<ul class="reading-list">'}htmlOut+=`<li>${/^https?:\/\//.test(t)?`<a href="${escapeHTML(t)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t)}</a>`:escapeHTML(t)}</li>`;continue;}
 if(answerHeading(t) && (lastKey || /^A\s*[–:-]/i.test(t)) && !(i===1 && blockIndex===71)){
   flushAnswer();
   if(!lastKey){htmlOut+=responseBox();lastKey='response-'+i+'-'+response}
   inAnswer=true;answerSourceIndex=blockIndex;forcedEnd=forcedEnds[i]?.[blockIndex]??-1;answerRemaining=(i===0 && blockIndex===111)?4:(t.replace(/^(?:Suggested (?:response|answer|approach|plan)|Sample (?:response|answer)|Model (?:response|answer)|Answer\s*[:–-]|A\s*[–:-]\s+)/i,'').trim()?0:1);
   const rest=t.replace(/^(?:Suggested (?:response|answer|approach|plan)|Sample (?:response|answer)|Model (?:response|answer)|Answer\s*[:–-]|A\s*[–:-]\s+)/i,'').trim();
   if(rest)answerText+=`<p>${escapeHTML(rest)}</p>`;
   continue;
 }
 if(inAnswer && forcedEnd<0 && (answerRemaining<=0 || sectionHeading(t)||/^Activity\s*\d+/i.test(t)||/^Check your understanding/i.test(t)||/^Scenario\s*:/i.test(t)||/^Q\s*[–:-]/i.test(t))){flushAnswer();lastKey=null}
 if(inAnswer){answerText+=`<p>${escapeHTML(t)}</p>`;answerRemaining--;continue}
 if(/^Activity\s*\d+/i.test(t)){
   lastKey=null;activity++;htmlOut+=`<section class="activity-section"><h2>${escapeHTML(t)}</h2>`;continue
 }
 if(i===1 && blockIndex===189){htmlOut+=`<p class="reading-paragraph campaign-fields">${escapeHTML(t).replace(/\n/g,'<br>')}</p>`;if(!lastKey){htmlOut+=responseBox();lastKey='response-'+i+'-'+response}continue}
 if((i===5 && blockIndex===101) || promptMarker(t)){
   if(!lastKey){htmlOut+=responseBox();lastKey='response-'+i+'-'+response}
   continue;
 }
 if(/^Q\s*[–:-]/i.test(t)||/^Check your understanding/i.test(t)){
   lastKey=null;
   htmlOut+=`<h3 class="question-heading">${escapeHTML(t)}</h3>`;
   if(/^Q\s*[–:-]/i.test(t)){htmlOut+=responseBox();lastKey='response-'+i+'-'+response}
   continue;
 }
 if((i===1&&blockIndex===71) || (i===5&&blockIndex>=42&&blockIndex<=66&&['For example:',"Identify the patient's:",'Consider the available alternatives.'].includes(t))){htmlOut+=`<p class="reading-paragraph">${escapeHTML(t)}</p>`;}else if(isInstructionStep(i,blockIndex,t) || (i===2 && smallTitles.has(t))){
   htmlOut+=`<h3 class="reading-numbered-point">${escapeHTML(t)}</h3>`;
 }else if(sectionHeading(t)){
   lastKey=null;htmlOut+=`<h2 class="reading-heading${/^\d+\.\s/.test(t)?' reading-heading-numbered':''}">${escapeHTML(t)}</h2>`;
 }else if(/^\d+\.\s+/.test(t)){
   htmlOut+=`<h3 class="reading-numbered-point">${escapeHTML(t)}</h3>`;
 }else if((editorialBoldByModule[i]&&editorialBoldByModule[i].has(t)) || (i===5&&module6Steps.has(t)) || (i===2 && boldTitles.has(t))){
   htmlOut+=`<h3 class="reading-subheading">${escapeHTML(t)}</h3>`;
 }else if((i===5&&blockIndex>=42&&blockIndex<=66&&['For example:',"Identify the patient's:",'Consider the available alternatives.'].includes(t)) || (i===2 && t==='Different forms of workplace support serve different purposes:')){
   htmlOut+=`<p class="reading-paragraph">${escapeHTML(t)}</p>`;
 }else if(subHeading(t)||/^(?:Testimonials and Independent Reviews|Protecting patient confidentiality|Responding to Public Comments|Care Communication or Promotion\?|Promotional Emails and SMS|Examples of Advertising Concerns|Five requirements to recognise|A practical consultation sequence|Use teach back|Make communication accessible|Building professional relationships|Sharing information appropriately|How to respond to dissatisfaction)$/i.test(t)){
   htmlOut+=`<h3 class="reading-subheading">${escapeHTML(t)}</h3>`;
 }else{
   htmlOut+=`<p class="reading-paragraph">${escapeHTML(t)}</p>`;
 }
}
flushAnswer();closeList();htmlOut+='</div>';
$('#tabbody').innerHTML=`<div class="notice">Write your own responses before opening the suggested answers. Your writing is saved automatically in this browser.</div>${htmlOut}<button class="btn" id="toPost">Continue to post-check →</button>`;
document.querySelectorAll('[data-response]').forEach(el=>el.oninput=()=>{
 state[el.dataset.response]=el.value;save();
 const btn=document.querySelector(`[data-reveal="${el.dataset.response}"]`);
 if(btn)btn.disabled=!el.value.trim();
});
document.querySelectorAll('[data-reveal]').forEach(btn=>btn.onclick=()=>{
 const panel=document.getElementById('answer-'+btn.dataset.reveal);
 panel.hidden=!panel.hidden;btn.textContent=panel.hidden?'Reveal suggested answer ↓':'Hide suggested answer ↑';
});
$('#toPost').onclick=()=>switchTab('post')
}
function wrapView(){let checks=m.blocks.filter(b=>b.type==='p'&&/^[☐□]/.test(b.text));$('#tabbody').innerHTML=`<div class="lesson"><h2>Workplace application & reflection</h2><p>Tick the practical steps you feel confident applying, then write one action to take into your next placement or graduate role.</p>${checks.map((b,k)=>`<label class="checkrow"><input type="checkbox" data-check="${k}" ${state['check-'+i+'-'+k]?'checked':''}><span>${escapeHTML(b.text.replace(/^[☐□]\s*/,''))}</span></label>`).join('')}<h3>My key takeaway</h3><textarea id="reflection" style="width:100%;min-height:120px;border:1px solid #cadbd8;border-radius:10px;padding:12px" placeholder="One thing I learned and how I will apply it…">${escapeHTML(state['reflection'+i]||'')}</textarea><p><button class="btn" id="finish">${state['done'+i]?'✓ Completed — update':'Mark module complete ✓'}</button></p></div>`;document.querySelectorAll('[data-check]').forEach(el=>el.onchange=()=>{state['check-'+i+'-'+el.dataset.check]=el.checked;save()});$('#reflection').oninput=e=>{state['reflection'+i]=e.target.value;save()};$('#finish').onclick=()=>{state['done'+i]=true;save();wrapView()}}switchTab(tab)}
function exploreFurther(){
$('#view').innerHTML=`<span class="eyebrow">KEEP LEARNING</span><h1 style="font-family:Georgia,serif;font-size:43px">Explore further</h1><p class="muted">Go beyond the lessons with selected professional guidance and useful reading discussed in the six modules. Links are grouped by topic and open in a new tab. Always check the latest requirements before applying guidance in practice.</p>${DATA.modules.map((m,i)=>`<section class="explore-section"><div class="moduleindex">MODULE ${String(i+1).padStart(2,'0')}</div><h2>${escapeHTML(m.name)}</h2><div class="explore-links">${(DATA.explore[i]||[]).map(r=>`<a class="explore-link" href="${escapeHTML(r.url)}" target="_blank" rel="noopener noreferrer"><strong>${escapeHTML(r.title)} ↗</strong><span>${escapeHTML(r.description)}</span></a>`).join('')}</div></section>`).join('')}<div class="notice">Want the complete research list? <a href="#references">View all references by module →</a></div>`}
function references(){
const formatRef=(r)=>{
 const safe=escapeHTML(r);
 return safe.replace(/(https?:\/\/[^\s<]+)/g,(url)=>{
  const trailing=url.match(/[.,;]+$/)?.[0]||'';
  const clean=trailing?url.slice(0,-trailing.length):url;
  return `<a href="${clean.replace(/&amp;/g,'&')}" target="_blank" rel="noopener noreferrer">${clean}</a>${trailing}`;
 });
};
$('#view').innerHTML=`<h1>References</h1><p class="muted">APA 7 reference lists supplied in the project reference document, organised by module.</p>${DATA.modules.map((m,i)=>`<section class="apa-group"><h2>Module ${i+1} · ${escapeHTML(m.name)}</h2>${(DATA.apaRefsFromDocument[String(i+1)]||[]).map(r=>`<p class="apa-entry">${formatRef(r)}</p>`).join('')}</section>`).join('')}`;
}
const WEQ_QUESTIONS=[["Ease of use", ["I find this website easy to use", "I had difficulty using this website", "I consider this website user friendly"]], ["Hyperlinks", ["The homepage clearly directs me towards the information I need", "The homepage immediately points me to the information I need", "It is unclear which hyperlink will lead to the information I am looking for", "Under the hyperlinks, I found the information I expected to find there"]], ["Structure", ["I know where to find the information I need on this website", "I was constantly being redirected on this website while I was looking for information", "I find the structure of this website clear", "The convenient set-up of the website helps me find the information I am looking for"]], ["Relevance", ["I find the information in this website helpful", "The information in this website is of little use to me", "This website offers information that I find useful"]], ["Comprehension", ["The language used in this website is clear to me", "I find the information in this website easy to understand", "I find many words in this website difficult to understand"]], ["Completeness", ["This website provides me with sufficient information", "I find the information in this website incomplete", "I find the information in this website precise"]], ["Lay out", ["I think this website looks unattractive", "I like the way this website looks", "I find the design of this website appealing"]], ["Search option", ["The search option on this website helps me to find the right information quickly", "The search option on this website gives me useful results", "The search option on this website gives me too many irrelevant results"]]];
function feedback(){
let qs=['The website is visually appealing.','The website is easy to navigate.','The website follows a logical structure.','The information is presented clearly and is easy to understand.','The content is relevant to physiotherapy students interested in private practice.','The website improved my understanding of business and practice management concepts.','The interactive activities enhanced my learning.','I feel more confident applying basic business concepts after using this resource.','I would recommend this resource to other physiotherapy students.'];
let weq=WEQ_QUESTIONS;
const scale=(key)=>`<div class="choices">${[1,2,3,4,5].map(v=>`<label><input type="radio" name="${key}" value="${v}" ${state[key]==v?'checked':''}> ${v}</label>`).join('')}</div>`;
let n=0;
$('#view').innerHTML=`<h1>Website evaluation</h1><p class="muted">Please rate each statement based on your experience using Clinic Ready.</p><p><strong>Rating scale:</strong> 1 = Strongly disagree · 2 = Disagree · 3 = Neutral · 4 = Agree · 5 = Strongly agree.</p><div class="lesson"><h2>Part A — Clinic Ready feedback</h2>${qs.map((q,i)=>`<div class="quizitem"><strong>${i+1}. ${escapeHTML(q)}</strong>${scale('f'+i)}</div>`).join('')}<h2>Part B — Website Evaluation Questionnaire (WEQ)</h2><p class="muted">The 26 WEQ statements are grouped by their original dimensions. Please answer all statements, including those phrased negatively.</p>${weq.map(([section,items])=>`<h3>${escapeHTML(section)}</h3>${items.map(q=>{n++;return `<div class="quizitem"><strong>${n}. ${escapeHTML(q)}</strong>${scale('weq'+(n-1))}</div>`}).join('')}`).join('')}<p class="small muted">Responses are stored in this browser until you export or clear your local data. The export includes both questionnaires.</p><button class="btn" id="export">Export my learning and feedback data (JSON)</button></div>`;
qs.forEach((_,i)=>document.querySelectorAll(`input[name=f${i}]`).forEach(r=>r.onchange=()=>{state['f'+i]=r.value;save()}));
for(let i=0;i<26;i++)document.querySelectorAll(`input[name=weq${i}]`).forEach(r=>r.onchange=()=>{state['weq'+i]=r.value;save()});
$('#export').onclick=()=>{let blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),learning:state},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='clinic-ready-learning-export.json';a.click();URL.revokeObjectURL(a.href)};
}
$('#search').oninput=e=>{let q=e.target.value.trim().toLowerCase();if(!q){render();return}let hits=[];DATA.modules.forEach((m,i)=>m.blocks.forEach(b=>{let t=b.type==='p'?b.text:b.rows.flat().join(' ');if(t.toLowerCase().includes(q))hits.push({i,t})}));$('#view').innerHTML=`<h1>Search results</h1><p>${hits.length} matches for “${escapeHTML(q)}”</p>${hits.slice(0,60).map(h=>`<div class="searchhit"><strong>${escapeHTML(DATA.modules[h.i].name)}</strong><p>${escapeHTML(h.t.slice(0,360))}</p><button class="btn secondary" data-go="module-${h.i}">Open module</button></div>`).join('')}`;bindGo()};window.addEventListener('hashchange',render);nav();render();