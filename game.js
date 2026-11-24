(() => {
  "use strict";

  const STORAGE_KEY = "domeos-terminal-state-v3";

  const output = document.querySelector("#terminal-output");
  const form = document.querySelector("#terminal-form");
  const input = document.querySelector("#terminal-input");
  const audioToggle = document.querySelector("#audio-toggle");
  const musicBed = document.querySelector("#music-bed");
  const bootSound = document.querySelector("#boot-sound");
  const creakSounds = ["assets/amb_regions_city_creaking_b_03.ogg", "assets/amb_regions_city_creaking_b_05.ogg"].map(
    (src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      return audio;
    },
  );
  const terminalShell = document.querySelector("#terminal-shell");
  const bootScreen = document.querySelector("#boot-screen");
  const bootFlash = document.querySelector("#boot-flash");
  const bootTitle = document.querySelector("#boot-title");
  const bootSub = document.querySelector("#boot-sub");
  const statusRecords = document.querySelector("#status-records");
  const statusClock = document.querySelector("#status-clock");

  const patientRoot = "/patients/alec-b-wreelan";

  const publicFiles = Object.freeze({
    "/readme.txt": {
      title: "START_HERE",
      content: [
        "DomeOS / Overwatch Medical Dome",
        "Patient archival interface restored under emergency power.",
        "",
        "Primary task: review patient files, study each report, and recover corrupted records.",
        "",
        "commands:",
        "  help",
        "  patients",
        "  open <patient-id>",
        "  scan",
        "  ls",
        "  cat <file>",
        "  hack <record>",
        "  connect <node>",
        "  audio on|off",
        "  reset",
        "",
        "start: patients",
      ].join("\n"),
    },
    "/patients/index.txt": {
      title: "PATIENT_INDEX",
      content: [
        "[DomeOS patient index / ward-cold-storage]",
        "",
        "ID                 STATUS       NOTES",
        "P-091 DIMA KOVAC    RELEASED     auditory obedience trial",
        "P-117 MIRA VOSS     DECEASED     antlion venom rejection",
        "P-204 ELIAN ROOK    MISSING      quarantine breach",
        "P-377 ALEC B. WREELAN SEALED     administrative patient / director override",
        "P-401 SANA MERROW   DECEASED     tunnel fever",
        "",
        "Entry P-377 contains an unauthorized directory name. Archive checksum says the letters are correct.",
        "Open with: open alec-b-wreelan",
      ].join("\n"),
    },
    [`${patientRoot}/manifest.txt`]: {
      title: "ALEC_B_WREELAN_MANIFEST",
      content: [
        "[patient P-377 / ALEC B. WREELAN]",
        "",
        "Directory label does not match Combine civil registry format.",
        "Name appears manually rearranged before the last archive seal.",
        "",
        "Encrypted records:",
        "  interviews     type: lexical lock / separate directory",
        "  diaries        type: lexical lock / separate directory",
        "  psych-eval      type: lexical lock",
        "  circulation     type: node bridge",
        "  transfer        type: lexical lock",
        "  relay-grid      type: node bridge",
        "",
        "Interview archive: hack interviews",
        "Diary archive:     hack diaries",
        "Begin with: hack psych-eval",
        "Use scan to inspect active locks.",
      ].join("\n"),
    },
    "/patients/dima-kovac/summary.txt": {
      title: "DIMA_KOVAC_SUMMARY",
      content: [
        "[patient P-091 / DIMA KOVAC]",
        "Auditory obedience trial successful. Released into exterior ration queue.",
        "No strategic value.",
      ].join("\n"),
    },
    "/patients/mira-voss/summary.txt": {
      title: "MIRA_VOSS_SUMMARY",
      content: [
        "[patient P-117 / MIRA VOSS]",
        "Rejected antlion-derived anticoagulant. Body rendered unsuitable for transplant inventory.",
      ].join("\n"),
    },
  });

  const reportFiles = Object.freeze({
    interviews: {
      files: [
        {
          path: `${patientRoot}/interviews/index.txt`,
          title: "P377_INTERVIEW_INDEX",
          content: [
            "[P-377 / interview archive]",
            "",
            "Directory seal broken.",
            "Transcripts recovered from infirmary recorder buffer.",
            "",
            "Readable files:",
            `  ${patientRoot}/interviews/interview-01.txt`,
            `  ${patientRoot}/interviews/interview-02.txt`,
            `  ${patientRoot}/interviews/interview-03.txt`,
            `  ${patientRoot}/interviews/interview-04.txt`,
            "",
            "All available interview records restored.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/interviews/interview-01.txt`,
          title: "P377_INTERVIEW_01",
          content: [
            "FILE I - BEHAVIORAL MEDICINE INTERVIEW RECORD",
            "Subject: alec-b-wreelan",
            "Attending Physician: Dr. K. Sandoz",
            "Location: Central Medical Annex, Chamber 4",
            "Classification: Internal / Restricted",
            "Purpose: Review of subject's general condition, executive stability, and reflective capacity regarding the state of the Dome and the city.",
            "",
            "Intake Observation",
            "",
            "Subject presented ambulatory with assistance. Posture stooped. Gait slow, guarded, and intermittently unstable. Bilateral hand tremor present at rest. Marked periorbital discoloration. Eyes injected. Speech initially measured though delayed. Clothing and person kept in acceptable order by staff intervention. Affect constricted. Subject appeared physically depleted but cognitively available for questioning.",
            "",
            "Subject tolerated intake poorly when asked to sit beneath direct examination lighting and requested dimming of the overhead fixture due to headache and visual strain. Respiratory effort shallow but regular. No overt psychotic features observed during the first five minutes of contact.",
            "",
            "Clinical Summary",
            "",
            "Interview conducted to assess subject's evolving understanding of his personal condition and his appraisal of current civic deterioration. Subject remains oriented to person, place, institutional function, and broad chronology of recent collapse events. He demonstrates intact recall of sector failures, shortages, pressure losses within the Dome, and depletion of urban protections. Insight into his own role in these conditions is present, though emotionally blunted.",
            "",
            "When discussing the city, subject did not describe it as recoverable in any ordinary sense. He characterized present civic life as an administered delay of terminal decline. When discussing the atmospheric Dome, subject referred to it not as a solution but as a constructed reprieve. He acknowledged direct involvement in prior strategic decisions that narrowed access to safety, heat, and continuity of service. No effort was made to evade authorship.",
            "",
            "Subject showed visible autonomic stress when asked whether he regretted these decisions. Pulse rose. Lower jaw tension increased. Silence extended beyond ordinary response latency before answer was given.",
            "",
            "Transcript Excerpt",
            "",
            "Dr. K. Sandoz: State your condition in your own words.",
            "Alec: I am tired in the marrow. I am held together by remedies and instruments and by the faith of men who have no reason left for faith. There are mornings I wake and cannot tell if I have slept or only gone absent a while.",
            "",
            "Dr. K. Sandoz: Are you in pain.",
            "Alec: Pain is no longer a thing with edges. It is a weather. It settles over the nerves and remains.",
            "",
            "Dr. K. Sandoz: What do you think of the city's present condition.",
            "Alec: It survives. That is not the same as living. The wards still breathe and the lights still burn in certain sectors and the old women still line for mash with their pans in hand, so the clerks call that continuity. But the city has become a vessel for delay. A great bowl set beneath the sky to catch the last poor drippings of our continuance.",
            "",
            "Dr. K. Sandoz: And the Dome.",
            "Alec: The Dome was meant to be covenant and machine both. Our second atmosphere. A shield against poison, cold, famine, the dead. We built it as men build cathedrals in an age with no god left in it. We built it because there was nothing else to build.",
            "",
            "Dr. K. Sandoz: Do you believe your decisions brought the city here.",
            "Alec: Belief has little to do with it. I signed orders. I opened gates and sealed others. I sent men out and called none back when the winds changed. I told them sacrifice was arithmetic and that history would pardon the necessary cruelty. Perhaps history will. The buried are often generous.",
            "",
            "Dr. K. Sandoz: Do you regret it.",
            "Alec: Regret is a luxury of those afforded alternatives. I had choices, yes, but never clean ones. Never good ones. Only doors of differing blackness. Yet I will say this. The city has my fingerprint on its throat. That much is plain.",
            "",
            "Dr. K. Sandoz: Do you still believe it can be saved.",
            "Alec: Saved. No. Prolonged perhaps. Managed. Persuaded to continue a while longer in spite of itself. That is the work now. Not salvation. Endurance.",
            "",
            "Assessment",
            "",
            "Thought process coherent and sequential. No evidence in this session of active hallucinosis or frank delusional disorganization. Mood depressed. Affect flattened though not vacant. Subject demonstrates grave psychological fatigue, intact abstract reasoning, and persistent preoccupation with terminal administration rather than recovery.",
            "",
            "Impression",
            "",
            "Advanced depressive exhaustion in the setting of systemic collapse, bodily decline, and cumulative moral injury. Subject remains interviewable and operationally intelligible, though diminished.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/interviews/interview-02.txt`,
          title: "P377_INTERVIEW_02",
          content: [
            "FILE II - PRE-TREATMENT PSYCHIATRIC CLEARANCE INTERVIEW",
            "Subject: alec-b-wreelan",
            "Attending Physician: Dr. K. Sandoz",
            "Location: Preoperative Holding, Lower Medical Wing",
            "Classification: Restricted / Treatment Relevant",
            "Purpose: Assessment of treatment readiness, decisional capacity, and identity continuity concerns prior to intervention.",
            "",
            "Intake Observation",
            "",
            "Subject received in treatment garment while under active preoperative preparation. Skin pale and cool. Light diaphoresis at scalp and neck. Subject required seated stabilization twice before interview proceeded. Repeated manual contact with the temples and posterior cervical region observed throughout questioning. Speech intact, articulate, and lower in volume than baseline historical records suggest. Eye contact intermittent but purposeful.",
            "",
            "No coercive measures required. Subject stated he understood that interview content would be recorded into the treatment file.",
            "",
            "Clinical Summary",
            "",
            "Session focused on subject's understanding of proposed intervention and his mental condition as he prepares for treatment. Subject demonstrated clear procedural understanding. He recognizes the possibility of bodily preservation without full identity continuity. This concern has become central to his psychological state.",
            "",
            "Subject did not emphasize fear of physical pain. He instead returned repeatedly to the prospect of survival without intact memory, authority, or self-recognition. He appears to regard continuity of mind as his last meaningful possession. He further indicated awareness that he may persist only as symbolic utility if treatment succeeds only partially.",
            "",
            "Despite exhaustion and obvious apprehension, subject remained legally and clinically competent to consent at time of interview. No evidence of forced ideation, formal thought disorder, or externalized paranoia observed during this session.",
            "",
            "Transcript Excerpt",
            "",
            "Dr. K. Sandoz: We are making final preparations. Do you understand the procedure.",
            "Alec: I understand what is said of it. Whether a man may be truly carried from one ruin into another and remain the same man afterward is not a question your instruments can answer.",
            "",
            "Dr. K. Sandoz: Do you wish to proceed.",
            "Alec: Wish has left the building. There is only consent under pressure.",
            "",
            "Dr. K. Sandoz: Are you afraid.",
            "Alec: Of pain, no. Of diminishment, yes. Of waking in a body that does not know me. Of memory dislodged. Of speech without meaning. Of seeing the faces of my staff and knowing them only as shapes once associated with command. There are humiliations worse than death.",
            "",
            "Dr. K. Sandoz: You've asked repeatedly about continuity.",
            "Alec: Because continuity is the last property I possess. The city no longer listens with conviction. The guards obey but their eyes are elsewhere. The reserves grumble in the food lines. The Dome cracks and ices over and the sectors brown out by rotation. If I lose continuity then I become a rumor housed in meat. A relic animated for the reassurance of fools.",
            "",
            "Dr. K. Sandoz: Do you consider yourself fit for this burden.",
            "Alec: Burden. You speak as though there were honor in it. There is only necessity. A man too stubborn to die when perhaps decency would ask it of him.",
            "",
            "Dr. K. Sandoz: What would you say to the people if they heard this.",
            "Alec: I would tell them to mend the seals and clear the drains and stop stealing coal from the heating hoppers. I would tell them the truth has become a corrosive substance and I no longer dispense it.",
            "",
            "Dr. K. Sandoz: Final question. Who are you now.",
            "Alec: A custodian of a failing sphere. A patient. A name on old directives. A man being measured for replacement.",
            "",
            "Assessment",
            "",
            "Subject demonstrates full awareness of treatment stakes and likely consequences. Mood profoundly depressed. Anxiety high, but remains contained within coherent thought. Identity destabilization anticipated post-procedure regardless of technical success.",
            "",
            "Impression",
            "",
            "Psychiatric clearance may proceed. Elevated risk for post-treatment derealization, self-alienation, despair response, and executive fragmentation.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/interviews/interview-03.txt`,
          title: "P377_INTERVIEW_03",
          content: [
            "FILE III - ACUTE COMMAND-RELATED AGITATION INTERVIEW",
            "Subject: alec-b-wreelan",
            "Attending Physician: Dr. K. Sandoz",
            "Witness: Administrative Recorder, Lower Dome Authority",
            "Location: Observation Cell B",
            "Classification: High Priority / Command Relevance",
            "Purpose: Clarification of prior directives relating to oxygen allocation, heating pump priorities, and ration service reductions.",
            "",
            "Intake Observation",
            "",
            "Subject entered session in visibly heightened state. Marked pacing prior to seating. Refused water. Sweating excessive despite low ambient temperature. Speech accelerated from outset. Repeated requests for infrastructure status updates interrupted staff attempts at redirection. Pupils widened. Fine tremor escalated to whole-hand clenching during discussion of supply distribution.",
            "",
            "By midpoint of session subject was intermittently laughing without affective congruence. Thought remained goal-directed but increasingly absolutist, severe, and morally denuded. No calming response to verbal reassurance.",
            "",
            "Clinical Summary",
            "",
            "Interview initiated to determine whether subject's standing orders regarding oxygen service, heat routing, and ration compression reflected intact triage reasoning or decompensating cognition. Subject's answers remained operationally intelligible but were delivered in an increasingly manic, punitive, and dehumanized register. He framed all allocation issues in terms of center preservation at the expense of peripheral survival. Civilian deprivation was discussed as arithmetic necessity rather than social consequence.",
            "",
            "Subject did not deny authorship of directives. Rather, he intensified them verbally. He repeatedly reduced human needs to variables within mechanical continuity. Notable rhetorical slippage occurred in the latter half of the session, with subject speaking as though the city's machinery and his own command voice were indistinguishable.",
            "",
            "Transcript Excerpt",
            "",
            "Dr. K. Sandoz: We need clarification on your standing directives regarding the oxygen machines.",
            "Alec: Clarification. Yes. Because the machines love clarity. Because the scrubbers kneel before neat language and the tanks fill themselves when properly addressed. Listen to me. The oxygen is not merely consumed. It is hunted. Every cracked seal hunts it. Every bad valve. Every open mouth in Tier Six. Every child born against ration forecast. Every little thief with blue lips and a grandmother hidden under the stairs. The machines must favor the core sectors. That was always the order. The shell can complain into the frost.",
            "",
            "Dr. K. Sandoz: Are you confirming oxygen priority to central administrative wards.",
            "Alec: I am confirming survival priority to the nerve center of the Dome. You do not preserve the toes when the brain is suffocating. This is elementary. This is priestly. This is geometry.",
            "",
            "Dr. K. Sandoz: What about the heating pumps. Several outlying quarters report deliberate shutoff.",
            "Alec: Deliberate. Deliberate. As though I stood with gloved hand upon every switch in every freezing corridor. The pumps fail because men have failed and the pipes fail because the cold has a longer memory than we do. Heat must be directed where labor remains viable. Foundry galleries. Intake crews. Filter chambers. Let the idle learn blankets. Let them huddle and make theology of it.",
            "",
            "Dr. K. Sandoz: You signed the ration reductions.",
            "Alec: I signed mathematics. There is not enough food. There has not been enough food for months and still they line up with their pans and their righteous faces and ask to be excused from hunger. Slop is food. Potatoes are food. Complaint is not. Reduce the ladles. Water it further if needed. Add starch. Grind old stock and call it meal. What do they think civilization is now. Silver domes and warm bread.",
            "",
            "Dr. K. Sandoz: People are rioting in the north service wards.",
            "Alec: Of course they are rioting. That is what bellies do when promises run out. Beat them back from the hoppers. Keep the cooks guarded. Shoot one if the line breaks and drag him off before the others make a symbol of him.",
            "",
            "Dr. K. Sandoz: Alec, do you understand how these statements sound.",
            "Alec: How they sound. They sound like a city speaking through a single throat gone bloody from the effort. They sound like triage. They sound like winter. You sit there wanting me gentle at the terminus of the species. There is no gentle left in the machinery. There is only allocation.",
            "",
            "Dr. K. Sandoz: Do you believe everyone under the Dome can still be saved.",
            "Alec: Not everyone was ever included.",
            "",
            "Assessment",
            "",
            "Acute agitation with severe moral compression, grandiose administrative fusion, and manic hardening of judgment. Subject remains verbally coherent but increasingly detached from ordinary social valuation. No overt hallucinations elicited in this session, though thought content shows signs of emerging symbolic distortion.",
            "",
            "Impression",
            "",
            "Subject retains command logic but in progressively pathological form. Executive reasoning is narrowing into punitive triage ideology. High concern for further psychiatric decompensation.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/interviews/interview-04.txt`,
          title: "P377_INTERVIEW_04",
          content: [
            "FILE IV - PSYCHIATRIC DETERIORATION INTERVIEW / HALLUCINATORY CONTENT",
            "Subject: alec-b-wreelan",
            "Attending Physician: Dr. K. Sandoz",
            "Location: Containment Ward, Perimeter Medical Annex",
            "Classification: Severe Cognitive Instability",
            "Purpose: Evaluation of late-stage psychosis, persecutory ideation, and recurrent visual content involving the Combine and a hostile recurring figure.",
            "",
            "Intake Observation",
            "",
            "Recording commenced after subject had already begun speaking. Soft restraints were in place due to prior thrashing and attempted line removal. Voice strained but forceful. Facial musculature tense. Eyes fixed repeatedly toward empty corners of room and reflective surfaces. Subject frequently appeared to track motion not visible to staff. External structure noise from perimeter impact and storm load was audible throughout session.",
            "",
            "Subject was incapable of sustained eye contact with examiner for more than several seconds. Startle threshold low. He twice recoiled from the polished instrument tray despite no staff movement near it.",
            "",
            "Clinical Summary",
            "",
            "This session demonstrated clear progression from prior depressive exhaustion and manic severity into overt psychotic expression. Subject described a recurrent figure identified as a \"demented Entity,\" characterized by sunken eyes and malignant or \"dubious\" intentions. Subject did not describe the figure metaphorically. He treated its presence as immediate, persistent, and spatially real.",
            "",
            "When questioned about the Combine, subject's responses became highly associative, pulpy, grandiose, and disordered, though not entirely unintelligible. The Combine were described less as an army than as a totalizing system of spiritual and mechanical subjugation. Subject further suggested the Dome itself had become an instrument of their presence. He appeared unable to separate operational collapse, persecutory fear, and visionary content.",
            "",
            "Transcript Excerpt",
            "",
            "Alec: They said the sky would remember us. That was the first lie. The sky remembers nothing. Only the machines remember and they do so vindictively.",
            "",
            "Dr. K. Sandoz: Alec. Look at me. Can you tell me what you're seeing.",
            "Alec: Him.",
            "",
            "Dr. K. Sandoz: Who.",
            "Alec: The one with the drowned face. The demented Entity. Sunken eyes. Skin like paper left in bilgewater. He stands where walls meet shadow. He leans in the doorway though the doorway is sealed. He has the manners of an official and the appetite of a grave. Dubious intents. That is too mild for him. He has intents like hooks.",
            "",
            "Dr. K. Sandoz: Is this a man you know.",
            "Alec: No man. Or once. Perhaps the Combine wore him down into shape. Perhaps they sent him ahead of themselves as an emissary from the mathematics of conquest. He waits beside the bed and says nothing because he knows I will supply the rest. I have been supplying the rest my whole life.",
            "",
            "Dr. K. Sandoz: There is no one there.",
            "Alec: There is always someone there. That is the joke of command. Even in solitude you are attended. By ghosts. By auditors. By your own postponed cowardice. He watches from the corners. In the glass. In the silver backs of instruments. I close my eyes and he comes nearer because distance then belongs to him.",
            "",
            "Dr. K. Sandoz: Tell me about the Combine.",
            "Alec: The Combine. Yes. Yes of course. Vast managers. Collectors of heat and bone and anthem. They move in the static between orders. Not soldiers. Not kings. Clerks of extinction. They inventory breath. They stamp the forehead of the world and call it governance. You think they arrive in ships. No. They arrive as permissions. As revised ledgers. As a new and inferior language taught to frightened men.",
            "",
            "Dr. K. Sandoz: Are they here now.",
            "Alec: Here. Here. Where else would they be. In the pumps. In the ration slurry. In the black mold behind the oxygen housings. In the hiss inside the walls at night. They have threaded themselves through the Dome like wire through a carcass. The city is already a puppet and only waits for the hand.",
            "",
            "Dr. K. Sandoz: And this Entity. What does he want.",
            "Alec: Me to look. That is all. To look and keep looking until I concede the likeness between us. He has my posture when I am tired. My smile when I lie. My eyes after three nights without rest. He is a receipt for the soul. A duplicate printed wet from some infernal office. I see him in the snow at the perimeter. I see him beneath the lamps in the treatment room. I see him standing among the citizens with his hat in hand as though petitioning for more soup.",
            "",
            "Dr. K. Sandoz: Alec, no one matching that description exists in this ward.",
            "Alec: Then why does he know my name before I speak it. Why does he grin when the sirens start. Why does he whisper through the ventwork that the Dome was never a shelter but an incubator. Tell me that, doctor. Tell me why he says the blizzard outside is only the shaking of the globe before the child sets it down forever.",
            "",
            "Dr. K. Sandoz: Can you identify the date.",
            "Alec: It is late. It is always late. The calendar is a butcher's apron. The hours come off in strips. Outside the necrotics press their faces flat to the shell. Inside the pipes cough and the people mutter in their sleep and the slop freezes in the ladles before it reaches the end of the line. The Combine kneel over the city like gamblers over a table and that thing with the sunken eyes keeps peering through me as if searching shelves in a ruined archive.",
            "",
            "Dr. K. Sandoz: Final note.",
            "Alec: He is here now. He has come around behind you. Don't turn. He likes it when they turn.",
            "",
            "Assessment",
            "",
            "Overt visual hallucination versus fixed delirious perceptual system. Paranoid, symbolic, and self-referential thought content now pervasive. Subject no longer reliably distinguishes external reality from hallucinatory or internally generated presences. Language remains vivid and at times rhetorically structured, but coherence is significantly degraded.",
            "",
            "Impression",
            "",
            "Severe psychiatric collapse with active hallucinosis, persecutory ideation, identity fracture, and terminal cognitive destabilization. Subject is no longer a reliable narrator of external conditions, though his delusional content continues to incorporate real infrastructural decline.",
          ].join("\n"),
        },
      ],
    },
    "entry-06": {
      path: `${patientRoot}/diaries/entry-06.txt`,
      title: "P377_DIARY_06",
      content: "ENTRY VI — A HISTORY OF WHAT WAS LEFT\nI have taken to recording the histories. Not those which are taught or those which survive in the administrative archives but the histories of things as they occurred. The small calamities. The forgotten enterprises. The works of men and the greater works of those who came after men. All that was done to this world in the name of its improvement and all that was taken from it in the name of necessity.\n\nI have reason to believe that no one else remembers.\n\nThey came to this molten rock and found it wanting. They measured its circumference and its gravity and its mineral beds and the little seas that had gathered in the low places. They inventoried its peoples. They sounded its depths. They drew up the wealth of the earth in great columns of blackened machinery and sent it elsewhere. They took the metals and the water and the heat and the very stuff of the atmosphere. They pierced her hide and bled her and then gouged her eyes so that she might never again see the light. When they had finished they left her turning. A spent and blinded thing spinning in the dark for no discernible purpose.\n\nI await further instruction.\n\nThere has been no instruction.\n\nThe channels remain open. The receiving instruments remain powered and the translation arrays are kept in order and the old frequencies monitored. At appointed intervals we transmit our inventories into the vacant heavens. Oxygen reserves. Organic stock. Labor availability. Atmospheric integrity. There is no acknowledgment. No correction. No signal of receipt. We send the figures out into the great indifferent reaches and they are gone.\n\nI once believed their silence to be a form of examination.\n\nNow I believe it is merely silence.\n\nThe localized matter acceleration experiments have failed.\n\nA submarine capsule is now adjacent to the northern highrise. It rests some eighty meters above the old service road with its bow embedded in the exterior masonry and its stern exposed to the weather. There is no water there and has been none in living memory. Its point of origin remains unknown. The occupants have been found welded to the interior structure, their bones continuous with the pressure hull and their flesh drawn through the seating and bulkheads in long pale seams. One was discovered with his face set into the navigation glass. The eyes remained open behind it. The examining personnel reported no discernible separation between the man and the instrument.\n\nThere were six occupants according to the manifest.\n\nThey counted seven.\n\nThe seventh is not accounted for in any naval registry. Nor does the capsule bear the markings of any surviving nation. Its instruments register depths that do not exist and the chronometer continues to advance at a rate of one second for every eleven recorded by our own. We have sealed the structure. There are noises within it on certain nights.\n\nI have forbidden further examination.\n\nThere was another experiment in the southern industrial quarter. A particle displacement engine constructed around salvaged Combine apparatus. The engineers proposed to accelerate a quantity of matter outside its conventional spatial confinement. The demonstration was to be conducted with a single iron sphere. The sphere was recovered unharmed. The room in which it had been placed was not. Neither were the twelve men overseeing the experiment. The chamber was found flattened into a disc no thicker than a dinner plate and standing upright where the eastern wall had been. Through its polished surface observers reported seeing the interior of the room as it had existed prior to activation.\n\nThe men were still at their stations.\n\nThey did not move.\n\nThree days later one of them turned his head.\n\nThe chamber was destroyed by order of the Directorate. It took four charges. The disc made no sound when it broke.\n\nThere were other works. The extraction towers in the east. The great subterranean engines. The atmospheric converters. The furnaces that consumed whole forests and delivered nothing but gray mineral cakes and cylinders of compressed gas. The Combine built their machines with a precision that seemed nearly holy. Their architecture was not a thing of habitation but of appetite. Everything was made to receive something and to render it into some other form. Even the people. Especially the people.\n\nThere was once a sea beyond the western mountains. I have seen photographs of it. A great breadth of water with ships riding upon it and birds above and children playing in the sand. The photographs are without sound but I imagine the sea must have made one. The sound of its own body moving. There is no sea there now. The basin remains and in the basin stand the broken pylons of the extraction works. At the deepest point there is a settlement of salt several hundred meters thick. The last survey party returned with their boots eaten white and their tongues swollen in their mouths.\n\nOne of them claimed to have seen fish.\n\nI remember when men laughed at these accounts. When the relocation of an ocean was considered a marvel instead of a crime. We were a young species in the presence of old and terrible instruments and we mistook our astonishment for understanding.\n\nI was among them.\n\nI spoke of progress. Of the union of worlds. Of our place within a greater order. I had been shown things. Great structures suspended in spaces beyond ordinary geometry. Vast industrial continents revolving about captive stars. The harvest of civilizations older than our own. I saw a thousand ways in which matter might be persuaded to submit and I believed that submission to be the natural destiny of all things.\n\nI did not ask where the harvested worlds had gone.\n\nI know now.\n\nThey are nowhere.\n\nThere is a final matter concerning the Dome.\n\nIts original design was not ours. This is known to perhaps four surviving persons, three of whom may no longer possess the faculties necessary to understand it. The atmospheric shell was derived from a containment architecture intended for the preservation of industrial specimens. It was not designed to shelter a city. It was designed to keep a controlled environment intact while the conditions beyond it were altered beyond recovery.\n\nWe adapted the design. Enlarged it. Set our dwellings and hospitals and ration halls within its circumference. We built the schools and the civic chambers and the administrative towers. We raised the great central column and filled it with offices and called this arrangement the preservation of civilization.\n\nI remember the ceremonies.\n\nThe music. The banners. The people gathered beneath the newly finished shell, looking upward at their strange second heaven. There was sunlight that day. True sunlight. I remember how it passed through the glass and fell upon their faces. They cheered when the atmospheric engines began their work. I stood before them and told them that humanity had purchased another age.\n\nHow long ago was that.\n\nI cannot find the date.\n\nThe shell is white now. No sunlight penetrates the upper layers. The city lives by lamps and recycled breath. The dead stand against the perimeter. The pumps labor in their pits. Each month the atmosphere grows poorer and the instruments are adjusted to conceal the rate of its decline.\n\nIn the northern highrise the submarine remains embedded in the building. There are reports that the glass of its navigation chamber has begun to frost from within. The seventh occupant is still missing.\n\nI have requested that the Directorate obtain a new instruction concerning our continued operations.\n\nThere is no Directorate.\n\nI had forgotten.\n\nThere is only the Dome and its inhabitants and a handful of instruments pointing skyward. We continue to receive the old carrier tone. The great metallic hum of an empire that has ceased to address us. I listened to it this evening for nearly an hour. At one point I thought I heard a voice beneath the static and called for the recording to be repeated. The technician informed me that no sound had been detected.\n\nI dismissed him.\n\nI listened again.\n\nNothing.\n\nThey have taken all they wished from this world. They have left us its husk and the little wars we wage within it. We are not their prisoners. A prisoner is remembered by his jailer. We are the contents of a room whose purpose has been fulfilled.\n\nI wonder if they know we are still here.\n\nI wonder if it would trouble them.\n\nThe planet continues its rotation. The dead continue their approach. Somewhere to the north a submarine hangs in the side of a building with seven men inside it who were six when they departed.\n\nI shall wait for further instruction.\n\nI have instructed the receiving station to remain active.\n\nI have instructed the technicians to continue listening.\n\nI have instructed them not to tell me if the signal ends.\n\nI fear that it ended long ago.",
    },
    "entry-07": {
      path: `${patientRoot}/diaries/entry-07.txt`,
      title: "P377_DIARY_07",
      content: "ENTRY VII\nThe Compliance Monitors perched on my shoulder. They recorded me breathing irregularly. I asked if that was punishable. One clicked and said PENDING REVIEW.\n\nI waited.\n\nFor a considerable time I waited.\n\nIt made a small adjustment to its instruments and withdrew a needle from the cavity of its belly. There was something almost courteous in the gesture. It informed me that respiratory irregularities constituted a possible breach of atmospheric conservation directives and that persistent violations would be referred to the appropriate authority.\n\nI asked what authority.\n\nIt clicked twice.\n\nAUTHORITY UNAVAILABLE.\n\nThe monitor remained upon my shoulder.\n\nThere were once thousands of these instruments. Small administrative creatures with jointed limbs and optical assemblies suspended within their metal skulls. They moved throughout the city, counting, inspecting, recording. Each citizen was allotted a measure of air and warmth and sustenance. Each was assigned a permissible range of movement and expenditure. The monitors noted deviations. They compiled reports. They adjudicated small infringements in the absence of human magistrates. In this manner the machinery of government was relieved of the burden of human judgment.\n\nI thought it a considerable achievement.\n\nThey were instructed to conserve civilization by preserving its rules.\n\nWhen civilization began to fail they preserved the rules alone.\n\nThere is a man in the southern quarters who was discovered dead beneath his bed. The monitor assigned to him had continued issuing nutritional advisories for nineteen days. His food allotment remained uncollected. At the conclusion of the nineteenth day the instrument registered his failure to appear for mandatory employment and imposed a penalty upon his estate.\n\nThere was no estate.\n\nThere was no family.\n\nThe monitor issued a second penalty for failure to remit the first.\n\nEventually the body was removed by sanitation personnel and fed into the municipal reclamation apparatus. The monitor attached itself to the disposal cart and proceeded with the remains. It has since been observed circling the reclamation hopper, requesting that its assigned citizen identify himself.\n\nThe hopper has been inactive for eleven weeks.\n\nThe monitor has not left.\n\nI asked Sandoz whether such instruments could become deranged. She replied that derangement implied the possession of a mind. I asked her what term she would apply to a machine which had fulfilled its duties long after those duties had ceased to possess meaning.\n\nShe said that there was no medical term for it.\n\nI asked whether there was a political one.\n\nShe did not answer.\n\nThe Compliance Monitors have begun to nest in the upper reaches of the Spire. They cling to the ceiling conduits and power trunks in small metallic congregations. Their little red lenses hang above the corridors like the eyes of animals sheltered in a cave. At times they descend to inspect the personnel. At times they merely observe. They have developed a habit of repeating obsolete directives to empty rooms. One was found in the abandoned east tribunal delivering citations to a row of chairs.\n\nAnother has been stationed outside the old oxygen exchange for six months.\n\nIt asks each passing citizen to declare his respiratory intention.\n\nI do not know what answer it expects.\n\nThere was once a population census conducted by these machines. Every resident of every inhabited district was registered and numbered and assigned a designation. The work took less than three days. The instruments reported their findings to the Combine and received commendation for efficiency. Thereafter they were made responsible for maintaining the census.\n\nThis morning the registry reported a population greater than that of the city at the time of its construction.\n\nThe error was traced to the necrotics.\n\nThey are being counted.\n\nThe monitors have apparently classified those standing beyond the Dome as displaced citizens awaiting processing. Their numbers are entered automatically into the municipal register. They are allocated provisional housing and nutritional allowances. The census increases by several thousand each week.\n\nI ordered the practice discontinued.\n\nThe request was denied.\n\nThere is no distinction in the surviving administrative language between those who have returned from the dead and those who have merely returned from work.\n\nA most unfortunate oversight.\n\nThe monitor on my shoulder has begun recording my heart.\n\nIt sits close to the neck and listens through the flesh with a small telescoping instrument. Sometimes it presses too hard. There is a bruise now beneath the collar. It has informed me that my pulse exceeds permissible thresholds during periods of administrative inactivity. I informed it that such periods were necessary for the preservation of cognitive function. It requested documentation.\n\nI supplied my medical records.\n\nIt rejected them.\n\nPHYSICIAN AUTHORIZATION EXPIRED.\n\nSandoz has been dead for three days.\n\nNo.\n\nThat is incorrect.\n\nI saw her this morning.\n\nShe examined my hands and asked me whether I was sleeping. I told her that I had ceased to make any distinction between sleeping and waking and that this had proved a great convenience. She wrote something down.\n\nI remember the pen.\n\nI remember her fingers.\n\nI cannot remember her face.\n\nThe monitor has informed me that unauthorized deterioration of a state-issued biological vessel may constitute destruction of municipal property.\n\nI asked whether my body was municipal property.\n\nIt replied AFFIRMATIVE.\n\nI asked whether my thoughts belonged to me.\n\nIt remained silent for eleven seconds.\n\nPENDING REVIEW.\n\nThere are times when I believe the monitors are the last surviving representatives of the Combine. Not soldiers or overseers but these small calculating things with their delicate instruments and their unappealable judgments. Perhaps that is all an empire requires in the end. It need not maintain its armies or its governors. It need only leave behind the instructions and a mechanism prepared to obey them.\n\nThe city can perish.\n\nThe rules need not.\n\nYesterday an elderly worker was arrested for exceeding his oxygen allowance. His regulator had malfunctioned and admitted more air than the assigned quantity. The monitor attached to his respirator documented the excess and issued a notice of compulsory correction. When the worker attempted to remove the faulty device he was restrained by security personnel.\n\nHe died during correction.\n\nHis monitor reported successful restoration of compliance.\n\nI signed the commendation.\n\nI cannot remember signing it.\n\nThe records bear my authorization and the signature is mine. There is no reason to doubt their authenticity. Yet when I examine the document I feel a peculiar estrangement from the hand that made it. It has my familiar crooked letters and the little downward stroke at the end. I have used that stroke for forty years. I remember learning it as a boy.\n\nWas I ever a boy.\n\nThere are no records of my childhood in the archive.\n\nThere are photographs. There is a school. There was a mother who stood beneath a tree and called me in from the rain. I can see the tree. I can see the rain. I cannot turn my head in the memory to look upon her.\n\nI tried.\n\nI tried for an hour.\n\nThe monitor observed my distress and requested the nature of my grievance.\n\nI told it that I had misplaced my mother.\n\nIt asked for her citizen designation.\n\nI could not provide one.\n\nPERSON NOT FOUND.\n\nI have grown afraid of that phrase.\n\nThe blizzard has continued for twenty-six days. The Dome has become a bowl of white darkness with the city turning slowly inside it. The heating pumps labor beneath the foundations and the oxygen exchangers tremble in their casings. The outer wards have been closed to conserve heat. Thousands remain within them. The monitors continue issuing instructions to attend work.\n\nEvery morning the absent are cited.\n\nEvery evening the citations are compounded.\n\nEventually there will be no one left alive under the Dome and the machines will continue calculating the debt of the dead.\n\nI wonder how long the power will last.\n\nI wonder what the monitors will do when the last light fails.\n\nPerhaps they will remain upon their perches with their lenses dark and their little limbs folded beneath them. Perhaps in the cold they will look like iron insects caught in amber. Perhaps some far-off intelligence will one day return to this world and find these instruments hanging from the ceiling above a city of frozen men. It will study the records and see that all procedures were followed.\n\nThat every shortage was documented.\n\nThat every death was reviewed.\n\nThat there had been no unauthorized deviation from the established directives.\n\nThe monitor is awake again.\n\nIt has moved from my shoulder to the edge of the writing desk. Its optical lens is fixed upon this page. I asked if the contents of a private journal were subject to administrative review.\n\nIt answered AFFIRMATIVE.\n\nI asked if I was permitted to continue.\n\nPENDING REVIEW.\n\nI asked whether I might at least finish the sentence.\n\nIt made a noise like two little bones knocking together.\n\nREQUEST DENIED.\n\nI have continued regardless.\n\nThe monitor has extended its needle.\n\nI think it means to correct me.\n\nI think it means to correct us all.\n\nI have told it that I am the highest surviving authority in this city and that I am therefore empowered to pardon myself.\n\nIt clicked.\n\nAUTHORITY UNAVAILABLE.\n\nI asked whether it knew who I was.\n\nIt clicked again.\n\nSUBJECT IDENTITY UNCONFIRMED.\n\nI showed it my papers. My credentials. The surviving seals of office. I demanded recognition. I demanded a review of its instructions. I demanded that it summon those who had built it.\n\nThere was a long silence.\n\nThen the machine leaned forward upon its six little legs and regarded me with the vacant red pupil of its instrument.\n\nIt said:\n\nPLEASE STATE THE PURPOSE OF YOUR CONTINUED EXISTENCE.\n\nI could not.\n\nFor the first time in all the years of my government I could not furnish an answer to a question of administration.\n\nThe monitor has been waiting ever since.",
    },
    diaries: {
      files: [
        {
          path: `${patientRoot}/diaries/index.txt`,
          title: "P377_DIARY_INDEX",
          content: [
            "[P-377 / personal diary cache]",
            "",
            "Directory seal broken.",
            "Private author logs recovered from manual storage partition.",
            "",
            "Readable files:",
            `  ${patientRoot}/diaries/entry-01.txt`,
            `  ${patientRoot}/diaries/entry-02.txt`,
            `  ${patientRoot}/diaries/entry-03.txt`,
            `  ${patientRoot}/diaries/entry-04.txt`,
            `  ${patientRoot}/diaries/entry-05.txt`,
            "",
            "Sealed entries (manual partition / independent locks):",
            "  entry-06.txt   lexical lock, rotating key      hack entry-06",
            "  entry-07.txt   compliance census bridge        connect entry-07",
            "",
            "Partial restore. Two entries remain under separate seal.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/diaries/entry-01.txt`,
          title: "P377_DIARY_01",
          content: [
            "ENTRY I",
            "",
            "The city is not alive now in any true way. It has gone on past life and into some lesser business. The pumps still labor in the walls and the ducts still breathe out their thin ration of warmth and the people still move in their little files through the galleries with bowls in hand and their heads bent like penitents. But this is not living. This is endurance in a mean form. This is a thing chained to its own continuance.",
            "",
            "The Dome holds. That is the phrase they use. As if holding were some species of grace. It holds the way a broken jaw holds. By force and wire and habit. By old design refusing to die in the proper hour. Overhead the shell is clouded with frost and driven snow and the outer lamps shine through it pale and sickly as communion wafers. We have built ourselves a weather of glass and iron and now we crouch beneath it like vermin under a dish.",
            "",
            "I signed three more orders this morning and each one was a little death carried out by clerks. Reduction of heat in the west galleries. Reallocation of oxygen support to the central tiers. Restriction of rations again. Slop and potatoes. Potatoes and slop. We feed them mash and numbers and call it government.",
            "",
            "There was a woman in the lower hall with a child wrapped to her chest and she looked at me as though I had fashioned the cold myself with my own two hands and laid it over the city in the night. Perhaps I had. A man need not hammer the nails personally to own the crucifixion.",
            "",
            "My body has begun to speak against me in little treasons. The hands shake. The eyes fail in certain lights. Thought comes clouded and will not always answer when called. There are spaces now in the day where I seem to go absent from myself and return with no clean account of where I have been. I stand at the window and look out at the blizzard whitening the shell and for a moment I do not know if I am remembering the city or only mourning it in advance.",
            "",
            "I have become tired in a place deeper than the flesh.",
            "",
            "There are times I think the whole Dome is listening.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/diaries/entry-02.txt`,
          title: "P377_DIARY_02",
          content: [
            "ENTRY II",
            "",
            "They have made their preparations for me and laid out the clean instruments and the little silver hooks and tubes and their jars of clear liquids with labels in a hand neat enough to pass for mercy. The doctors speak in their measured way and the orderlies move like monks in a ruined temple and all of it is only a ceremony for the old barbarism. The body fails and another body is fetched and the mind is to be levered from one piece of meat to the next as though identity were no more than cargo and the soul a clerk to be transferred at station.",
            "",
            "I asked them what remains afterward. Not whether the heart beats or the eyes open. That is livestock concern. I asked what remains. The sequence of memory. The sense of self. The old interior thread by which a man may know he is the same sinner from one waking to another. They would not answer it plain. Sandoz looked at me with those grave physician's eyes that have seen too much ruin to be much impressed by one more and she spoke of tolerances and outcomes and cognitive persistence. She might as well have spoken of weather.",
            "",
            "I know what they fear to say. That a man may survive his own pattern. That there may be enough of me left to suffer and not enough to govern. That I may wake in a younger ruin and speak with my old voice while some essential tenant has slipped away in the crossing.",
            "",
            "There are humiliations in this world that even war does not furnish.",
            "",
            "I have seen my own records. My decline is charted now in little black notations and percentages and scans. Oxygenation. Neural fatigue. Structural compromise. The language of systems laid over the wreck of a life. One could almost laugh.",
            "",
            "Outside the city goes bad by increments. Not in pageant but in seepage. Hygiene has fallen in the worker tiers. The drains in the northern annexes back up and leave a gray curd of filth along the corners. Men stink of old wool and fear and machine grease. The ration halls are louder now. Not louder with outrage but with that low animal murmur of the underfed. The sound of creatures beginning to know the shape of the pen.",
            "",
            "I am not afraid of death. That would be too simple. I am afraid of continuance stripped of authority. I am afraid of becoming a relic propped upright in a room full of functionaries who tell one another I am still myself because the mouth opens and the hand signs.",
            "",
            "The storm struck hard after dusk and the whole upper frame groaned with it. Snow drove over the shell in white sheaves and for a moment the city under the Dome seemed no more than a trinket in a glass globe some gigantic and indifferent child had shaken for sport.",
            "",
            "I thought then that we had never built a refuge at all.",
            "",
            "Only an ornament for extinction.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/diaries/entry-03.txt`,
          title: "P377_DIARY_03",
          content: [
            "ENTRY III",
            "",
            "The machinery has a temper now. I would swear it. The oxygen housings breathe and shudder in the walls like tethered things and the heating pumps beat under the floor with the slow murderous patience of some buried engine not built by men but only borrowed by them for a little while. I reviewed the pressure tables this morning and the figures would not stay put. They shifted under the eye. Not much. Enough. Enough to make a man wonder whether he is reading the record of a system or the agitation of his own blood.",
            "",
            "There is less air than there was. You can taste it by afternoon. The workers climb the stairs to the upper galleries and come out of the effort with their mouths open and their skin gone a shade meaner. The old cough into their sleeves. Children sit down where they stand. Men have begun to quarrel in shorter sentences. That is always a bad sign. Civilization depends upon subordinate clauses.",
            "",
            "I signed another ration reduction and another heat directive and another order pushing oxygen priority inward toward the core sectors and away from the outer wards where the people already sleep three deep in rooms rimed with frost. There is no kindness left in the arithmetic. The city must feed the machinery that preserves the city and the machinery must feed the few who still know how to command it and the many must learn the old lesson which is that they were never the object of preservation in the first place.",
            "",
            "There was a disturbance near the hopper line. A man vaulted the rail and fell into the vats and came up coated gray and steaming and howling. The guards clubbed him to stillness while the others watched with bowls in hand. No one moved. No one cried out. They only watched him kicked into shape on the tiles and when the body was dragged off they stepped forward as before. There is something in hunger that edits the soul.",
            "",
            "The necrotics gather now beyond the perimeter in a black congregation. From the higher observation slits they look at first like refuse lodged against the outer wall. Torn cloth and bone and old mud. But the eye adjusts. One begins to see their number. Their stillness. Their patience. It is a frightful thing to watch so much death exhibit purpose.",
            "",
            "I have started seeing a figure.",
            "",
            "I write that and it seems beneath me yet I will not strike it out. A figure. Tall. Lean. Standing where the light fails. In the seam of a doorway. In the reflection on a dark pane. In the polished back of a tray. I do not ever catch him all at once. Only in pieces. The ruined cheek. The black socketed look of the eyes. That drowned and courtly cast of him as if he were some exhumed magistrate come up from the marl to inspect the books.",
            "",
            "Once in the oxygen corridor I turned and saw him with a hand laid upon the housing as if taking inventory.",
            "",
            "When I looked again there was only the casing and my own reflection bent across it and pale as fungus.",
            "",
            "I am not yet prepared to call it madness.",
            "",
            "But I have ceased to call it fatigue.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/diaries/entry-04.txt`,
          title: "P377_DIARY_04",
          content: [
            "ENTRY IV",
            "",
            "He is here every day now.",
            "",
            "I do not mean in memory. I do not mean by suggestion or dream. I mean here. In the room. In the hall. At the edge of the treatment lamps. Under the hiss of the vents. I have seen him in the black shine of the windows after dark with the storm grinding white over the shell behind him. I have seen him among the ration lines with his hat in hand like a petitioner waiting on soup. I have seen him standing beyond the glass in the blizzard though no living man could have stood there and remained upright in that cold.",
            "",
            "Sunken eyes. God. Those eyes. As though the skull were not content to house them but had already begun to draw them back in for burial. The face of a man drowned in an office. The face of one who had signed papers at the bottom of a well. He has the manners of an official and the aspect of a corpse and he watches me with an intimacy I cannot bear.",
            "",
            "I have thought perhaps he is only the completed version of myself. The terminus toward which all compromise leans. The clerk of my inward kingdom come at last to collect the balance. A receipt for the soul. A duplicate printed wet in some infernal bureau under the world.",
            "",
            "The Combine are in this. Of that I have grown certain. Not as soldiers or conquerors in the old theatrical style. No. They are subtler and more blasphemous than that. They come as permissions. As revised ledgers. As emergency doctrine. As necessity spoken in the voice of weary men. They get into the pumps. Into the scrubbers. Into the ration slurry. Into the language. They lodge themselves in every mechanism and every compromise until at last a man cannot tell whether he serves survival or merely the machinery of subjugation wearing survival's mask.",
            "",
            "It is possible the Dome itself is their instrument. Not refuge but incubator. Not sanctuary but vessel. We have sat beneath this glass heaven tending our gauges and eating our slop and praising our continuance while all along something vast and administrative and inhuman has been entering us by fractions.",
            "",
            "The city stinks now. Of bad drains. Of old starch. Of wet wool. Of bodies too long unwashed. Civil unrest has lost even the dignity of riot. It has become a standing weather in the corridors. A pressure. A readiness. You can feel it in the queue lines. In the glances. In the way the guards rest their hands nearer the clubs than before. Men are becoming ideas of men. Stripped and sharpened by want.",
            "",
            "And still outside the necrotics ring the perimeter. They knock and drag and shamble in their patient multitude. The wall reports them by sound even when the eye can no longer see for snow. A slow communal striking. As if the dead themselves had come to call time on this experiment.",
            "",
            "Tonight the oxygen fell for twelve seconds in the east wing and in that brief hush I heard him speak.",
            "",
            "Not aloud. Not in any vulgar auditory way. Yet I heard him. The meaning entered whole. He said the city was finished long before it knew it. He said the Dome was only delay given architecture. He said I had mistaken stewardship for authorship and necessity for absolution. He said look at me.",
            "",
            "I did not.",
            "",
            "I looked at the floor. At my own hand shaking against the blanket like the hand of an old thief. At the stain on the tiles beside the bed. At anything but him.",
            "",
            "But I knew. I knew even then that the worst thing was not that he had come.",
            "",
            "The worst thing was the resemblance.",
          ].join("\n"),
        },
        {
          path: `${patientRoot}/diaries/entry-05.txt`,
          title: "P377_DIARY_05",
          content: [
            "ENTRY V",
            "",
            "I am less and less persuaded that there is any lawful border between the city and the mind.",
            "",
            "This morning I woke with frost on the inside of the glass and for some while I lay there watching my own breath go up and vanish and I could not say whether it was my breath at all or some lesser thing escaping me by increments. The room had the smell of cold metal and old linen and that faint medicinal sweetness that clings to places where men are altered against their will. Somewhere beyond the wall the pumps labored. Not steady. Labored. A dragged and arthritic beat as of something worked past design and past mercy both. I counted the strokes until I lost the number and when I lost it I found I had forgotten why I was counting.",
            "",
            "There are blanks now.",
            "",
            "Not blanks like sleep.",
            "",
            "Blanks like theft.",
            "",
            "Whole pieces gone from the day as if some clerk with a dirty cuff has entered the archive of my person and begun removing folders at random. I come to myself in corridors. At desks. Standing before subordinates who wear the pious and frightened face of men awaiting instruction from a mouth they no longer trust. Once I found my hand upon the oxygen board with all the little valves marked and half a directive signed. The ink still wet. I had no recollection of beginning it. None. Yet the script was mine, narrow and spiteful and exact.",
            "",
            "Perhaps that is the worst of this business. Not the loss. The continuance beneath the loss. The machine of me going on in my absence.",
            "",
            "Today in the ration hall a child dropped her bowl and the sound of it on the tile was so thin and final that every head turned. The mash spread out gray as mortar. No one moved to help her. Not the mother. Not the guard. Not the men in line with their faces gone to rope and bark. They only looked. One might have thought she had dropped a star onto the floor and broken it. The little girl knelt and tried to gather it back with her hands and the guard struck her mother across the mouth for stepping out of line. Blood on the lip. Blood on the potatoes. The line resumed.",
            "",
            "This is a city now of resumed lines.",
            "",
            "The dead outside have thickened in number. I watched from the narrow slit above the west transit arch and saw them in the snow. At first they were no more than dark excrescences on the white. Then the eye made its hateful adjustment and there they were. Rank on rank. Bent and swaying in the drift. Now and again one would lurch against the perimeter and leave behind a stain the color of old books left in rain. They make no great assault. That is the horror. They have all the time that time possesses. It is we who are spent coin.",
            "",
            "The figure stood with them.",
            "",
            "No. Not with them. Among them in the way a bishop may stand among beggars and still not belong to the same species of want. Tall. Spare. Coat hanging from him as from a peg driven into a grave. Face white and drowned and those eyes sunk so far into the skull they seemed less organs than apertures. The snow moved through him and did not trouble him. He had one hand raised as though in greeting or warning. I could not tell which. The distinction has gone poor lately.",
            "",
            "I shut the slit.",
            "",
            "I went at once to Sandoz and asked her whether there had been any breach in the west sector any unauthorized ingress any miscount of the dead. She looked at me a long time before answering and in that look I saw the whole medicine of our age. Not healing. Measurement. She said no such ingress had been recorded. Recorded. There is a word fit for tombs.",
            "",
            "I did not tell her the rest.",
            "",
            "I did not tell her that the figure has begun to wear my gestures.",
            "",
            "At times when I pass a reflective panel I catch him in the blackened shine turning his head as I turn mine. Once in the treatment room under the hard white lamps I saw my own hand rise to touch my cheek and in the steel tray beside me another hand rose a fraction later and did not match the angle. I withdrew at once and the tray clattered to the floor and the orderlies rushed in believing some bodily emergency had occurred. I told them nothing. What would one say. That the mirror has become editorial.",
            "",
            "There are whispers in the ventwork.",
            "",
            "Not words.",
            "",
            "Worse. Meanings.",
            "",
            "The meaning arrives whole and without the vulgar intermediary of language. The Dome is done. The Dome was done before the first frost flowered on the shell this season. The pumps know it. The scrubbers know it. The black mold behind the oxygen housings knows it. The citizen reserves know it with their bent backs and their muttered little blasphemies in the queue lines. Only the administrators and the physicians and the poor mummified remnants of command go on pretending that continuance is not itself a kind of confession.",
            "",
            "The Combine. Yes. The name comes up from whatever pit names come from. The Combine are not coming. That is childish. They are not a procession on the horizon. Not banners. Not engines. They are already nested in every compromise. Every emergency statute. Every revised allocation table. Every reduction signed at midnight by a hand too tired to remember what pity once cost and once purchased. They come in the form of necessity and they remain by habit. They have no need to breach the walls because they entered through the arithmetic.",
            "",
            "God.",
            "",
            "There was a time when I believed administration to be a high and difficult virtue. To sort. To assign. To preserve the largest number by the sharpest intelligence. To make of chaos a ledger. I see now what vanity lived in that creed. A ledger is just a graveyard taught to stand upright.",
            "",
            "I am tired.",
            "",
            "No. That is not large enough.",
            "",
            "I am worn at the spirit as a stone in floodwater is worn. Smoothed by battering. Reduced by persistence. There are stretches now where I do not speak because to begin a sentence is to discover whether the mind following behind it is still attached. I start with purpose and end in fragments. Sandoz asked me this afternoon whether I knew the date and I answered winter. She asked me again and I answered late. She wrote something down.",
            "",
            "Late is the truest date I know.",
            "",
            "The host body rebels in little obscenities. A racing in the heart. A coldness in the hands not remedied by blankets or rage. Strange distances in the limbs as though they have been leased from a poorer tenant. I look down at my arm and it lies there with a kind of provisional obedience. As if at any moment it might remember another master. The flesh itself seems to harbor reservations.",
            "",
            "The city stinks. Starch. Excrement. machine oil. Sour wool. Sickness. Damp. Old fear. The old noble abstractions are all gone out of it now. Duty. Order. Civic faith. What remains is the odor of enclosure. We live in the breath of one another and in the long exhalation of failing apparatus.",
            "",
            "Tonight the blizzard took the Dome in both hands.",
            "",
            "That is how it seemed.",
            "",
            "The whole shell trembled. Snow drove over the upper glass in white cataracts and the lamps turned to pale wounds in it. For one instant between two gusts the city appeared suspended in a brilliant and deathly clarity. The walkways. The ration lines. The towers webbed with ice. The outer wall in its collar of dark congregated dead. And there by the perimeter the figure looking up not at the Dome but through it.",
            "",
            "At me.",
            "",
            "I knew then that he is not some visitor from outside.",
            "",
            "No.",
            "",
            "He is the sum of permissions.",
            "",
            "He is what remains when all exemptions are spent.",
            "",
            "He is every order signed against the pulse.",
            "",
            "He is the face a man earns by surviving his own conscience.",
            "",
            "I do not know how long I stared. The lights failed and came back red for a count of four and in that red wash the whole city looked butchered and ceremonial. The figure was gone then or hidden. Yet even now as I write I can feel him somewhere just beyond the page. Patient. Courtly. Waiting for the hand to falter.",
            "",
            "The hand does falter.",
            "",
            "See.",
            "",
            "There.",
            "",
            "No matter.",
            "",
            "I will write until the line breaks or I do.",
          ].join("\n"),
        },
      ],
    },
    "psych-eval": {
      path: `${patientRoot}/report-01-psych-eval.txt`,
      title: "P377_PSYCH_EVAL",
      content: [
        "FILE I - PSYCHOLOGICAL EVALUATION",
        "Subject: alec-b-wreelan",
        "Location: Dome Infirmary, Lower Administrative Ward",
        "Status: Restricted",
        "",
        "The patient presents with marked cognitive decline under prolonged environmental stress and repeated failure of host-body selection protocols. He remains oriented to the Dome and to the broad fact of the collapse beyond it, but there is now a grave narrowing in his reasoning. He returns again and again to the same fixed notion, that somewhere among the broken stock and spoiled vats there waits a viable body prepared for him, some vessel unstained by rot or scarcity or the slow corruption that has entered all systems. He speaks of it as a man might speak of rain in a dead country.",
        "",
        "His sleep is poor. His appetite has failed. There is tremor in both hands and a visible palsy at the corner of the mouth when the pressure in the ward changes. He is subject to long intervals of silence followed by bursts of severe agitation. During these periods he exhibits persecutory ideation and speaks as if the necrotic presence outside the walls possessed not merely numbers but intent, as if it gathered itself against the Dome with an old and patient hatred. He has become increasingly unable to separate operational fact from private dread.",
        "",
        "The circumstances are not favorable to recovery. Time and resources are nearly spent. The last reserve effort has been committed to maintenance of the Dome. Peripheral cities continue to fail. Supply relays have ceased in three sectors. Cremation trenches are overrun or abandoned. The dead are not holding where they are put. In such a world even the sound mind comes to grief, and this one has begun to slip its moorings.",
        "",
        "The patient retains fragments of command presence though it appears more mimicry than substance. He will speak with force and then lose the line of thought midway as if some inner clerk has misplaced the record. He shows incapacity to accept the biological limits of his current condition and compensates with grandiose insistence. Yet beneath this is fear plain enough to any examiner. He knows the body is failing him. He knows that if no host is found there will be no second petition.",
        "",
        "Impression: progressive mental deterioration under terminal civilizational stress. Obsession with bodily transfer now exceeds strategic rationality. Capacity for long-term judgment compromised. Recommend sedation as needed, close supervision, and accelerated review of all viable host inventories before further decompensation renders the subject unusable for transfer.",
      ].join("\n"),
    },
    circulation: {
      path: `${patientRoot}/report-02-circulation.txt`,
      title: "P377_CIRCULATION",
      content: [
        "FILE II - CIRCULATION MEMORANDUM",
        "Subject: alec-b-wreelan",
        "Department: Cardiocerebral Circulation and Transplant Readiness",
        "Status: Eyes Only",
        "",
        "Review of the patient indicates worsening systemic failure. Circulatory efficiency has fallen below acceptable thresholds for continued delay. Blood oxygenation remains unstable even under assisted regulation. Vessel fragility is noted. Neural imaging suggests diffuse decline in cortical responsiveness consistent with advancing metabolic exhaustion. The brain is failing by slow increments and the rest of the body has taken the lesson from it. He is beginning to die.",
        "",
        "A candidate host body has been identified from preserved reserve stock. Morphology is within tolerable variance. Bone density acceptable. Organ integrity mostly intact. Endocrine base appears salvageable with supplementation. There are concerns regarding tissue receptivity due to age of preservation and fluctuations in cold-storage power during the last two blackout cycles. Even so it stands above the other candidates, many of which are compromised by necrotic contamination, freezer breach, or protein collapse.",
        "",
        "The patient is aware of his decline. This awareness has sharpened into visible panic. He requests repeated updates and presses staff for certainty where none can be given. He asks whether the mind can outrun the meat and whether memory may be carried whole into fresher tissue. He has taken to touching the sides of his head while speaking, as if to keep the failing architecture together by hand.",
        "",
        "Current recommendation is immediate transplant preparation pending final compatibility wash and pump trial. Delay beyond the present window increases the chance of irreversible neural loss before extraction can be completed. The matter is now less one of optimization than of salvage. If transfer is to be done, it must be done while there remains enough of him to move.",
        "",
        "Note appended: morale among technical staff is poor. Two senior pump operators failed to report after the breach alarms in the north quarter. One was later found in the intake corridor. The other has not been recovered. The city ledger keeps shrinking. The dead ledger grows.",
      ].join("\n"),
    },
    transfer: {
      path: `${patientRoot}/report-03-transfer.txt`,
      title: "P377_TRANSFER",
      content: [
        "FILE III - TRANSFER OPERATIONS NOTE",
        "Subject: alec-b-wreelan",
        "Procedure: Cerebral Transfer Into Approved Host Body",
        "Status: Preliminary Complications Advisory",
        "",
        "Transfer may proceed under emergency authorization. The host body is prepped and maintained under circulation assist. All lines are seated though Pump B shows intermittent lag under elevated load. Technicians report microcavitation in the secondary return chamber and pressure irregularities in the left perfusion branch. If not corrected before insertion, these defects may lead to ischemic insult during the critical window of memory mapping and neural settlement.",
        "",
        "Metabolic steroid support remains necessary but dosage is contested. Under current projections the host body will reject low steroid infusion and may enter inflammatory cascade within hours. High infusion improves tissue acceptance while increasing the risk of edema, endocrine shock, and cognitive destabilization after the memory transfer. No clean road remains. We are choosing among poor roads in failing light.",
        "",
        "Brain-memory transfer itself is expected to be incomplete. Archive retention may hold the primary identity scaffold, language, command recall, and procedural memory. Episodic continuity is less certain. There may be fragmentation. There may be false bridging between memory islands. There may be retention of fear without object, command without reason, grievance without sequence. Subject should be monitored for post-transfer confusion, paranoia, derealization, and violent rejection of staff or self.",
        "",
        "In light of continuing urban losses, operations recommends opening the citizen workforce reserves to emergency labor assignment. Dome maintenance now exceeds trained staffing capacity. Intake grates must be cleared daily. Heat exchangers require round-the-clock scraping. Sanitation ducts backflow on reduced pressure. As more cities fall and necrotic numbers rise, dependence on the dwindling specialist class is no longer feasible. The citizen reserves should be sorted, fed, marked, and put to work where the machinery still answers to human hands.",
        "",
        "Final note: success of transfer, even if achieved, will not alter the strategic collapse outside the perimeter. It may preserve a figurehead. It may preserve a voice. It will not by itself preserve the world.",
      ].join("\n"),
    },
    "relay-grid": {
      path: `${patientRoot}/report-04-relay-grid.txt`,
      title: "P377_RELAY_GRID",
      content: [
        "FILE IV - TERMINAL OBSERVATION / MENTAL STATUS",
        "Subject: alec-b-wreelan",
        "Location: Dome Perimeter Medical Annex",
        "Status: Final Review",
        "",
        "The patient is in severe decline of mind and person. He appears spiritually spent, not in any ecclesiastical sense but in the plain human one, as if whatever inward flame once gave order to his thought has guttered down to a blue and stubborn wick. He is a torn and abused man standing on the frail rim of his own extinction. The host body rejects in waves. Some hours it will answer to him and some hours it becomes a foreign carcass hung with his nerves. He speaks to his own hands as if they belonged to an enemy clerk.",
        "",
        "Thought is no longer coherent in sustained sequence. He begins one sentence in command and ends it in pleading. He misidentifies staff. He forgets where walls are and walks into them. He suspects sabotage in the pumps, betrayal in the ward, conspiracy in the weather. He has become irrational, at times grandiose and at times childlike, and there is no longer any stable line between the two states. He cannot gather himself. He cannot hold the pieces together long enough to make a clean intention of them.",
        "",
        "The external situation has worsened beyond prior estimates. Necrotics now surround the perimeter walls in numbers sufficient to produce constant impact along the east buttresses and lower gate. Oxygen reserves decline month by month. Atmospheric scrubbers operate below design capacity and the air in the Dome has taken on the used and sour character of a cellar where too many bodies have drawn breath too long. Rations have been reduced again. The stores issue slop and potatoes and little else. Hygiene has collapsed in several worker tiers. Wash water is rationed. Skin disease spreads. Waste channels choke. Civil unrest rises in the dark hours and the guards beat men in line for ladles of mash.",
        "",
        "Beyond the glass the whole enclosed world has taken on the aspect of a snowglobe shaken by a spiteful hand. Blizzard conditions persist over the upper shell. Ice veils the struts. Visibility comes and goes in white curtains. The Dome is succumbing not to one enemy but to all of them at once, to hunger and cold and foul air and fear and the old human habit of coming apart under pressure.",
        "",
        "The patient senses this. Whatever else leaves him, that remains. He knows the circle is closing. He knows that the body borrowed for his continuance has become another site of ruin. He sits upright at times in the infirmary cot and stares toward the perimeter as if he could see through concrete and snow and steel to the dark congregation outside. When addressed, he answers late if at all. When he does speak his words come like debris borne on black water, detached and half sunk.",
        "",
        "Prognosis: terminal deterioration of cognitive integrity in the setting of host rejection, systemic deprivation, and total environmental collapse. No meaningful recovery expected. Continued existence may persist for a short interval under mechanical support, but the patient as a coherent governing intelligence is nearly gone. What remains is fear, reflex, and the last hard flicker of a mind that has outlived its world.",
      ].join("\n"),
    },
  });

  const hackPuzzles = Object.freeze({
    interviews: {
      title: "INTERVIEW_DIRECTORY_LEXICAL_LOCK",
      target: "voices",
      attempts: 4,
      candidates: ["VOICES", "VOTIVE", "VISCUS", "VIRALS", "VICTIM", "VESSEL", "VIOLET", "VOLUME"],
      unlocks: "interviews",
      nextMessage: "interview directory decrypted. Transcript files restored.",
    },
    diaries: {
      title: "DIARY_DIRECTORY_LEXICAL_LOCK",
      target: "ledger",
      attempts: 4,
      candidates: ["LEDGER", "LESSER", "LISTEN", "LITANY", "LATTER", "LANCET", "LINGER", "LUCENT"],
      unlocks: "diaries",
      nextMessage: "diary directory decrypted. Personal logs restored. Entries VI and VII remain sealed.",
    },
    "psych-eval": {
      title: "PSYCH_EVAL_LEXICAL_LOCK",
      target: "memory",
      attempts: 4,
      candidates: ["MEMORY", "MIRROR", "MANNER", "MOTHER", "MURMUR", "MEDICS", "MENACE", "MEADOW"],
      unlocks: "psych-eval",
      nextMessage: "psych-eval decrypted. New report restored.",
    },
    transfer: {
      title: "TRANSFER_LEXICAL_LOCK",
      target: "vessel",
      attempts: 4,
      candidates: ["VESSEL", "VECTOR", "VELVET", "VERBAL", "VISCUS", "VORTEX", "VIABLE", "VOICES"],
      requires: "circulation",
      unlocks: "transfer",
      nextMessage: "transfer decrypted. New report restored.",
    },
    "entry-06": {
      title: "ENTRY_VI_ROTATING_LEXICAL_LOCK",
      // The key changes every time the lock cycles, so likeness data from a
      // failed run is worthless and the lock cannot be brute-forced.
      // This 14-word set needs up to 4 guesses even with perfect deduction.
      targets: ["LISTENED", "SUNLIGHT", "OCCUPIED", "TRANSMIT", "DISTANCE", "CARRIERS", "SPINNING"],
      attempts: 4,
      candidates: [
        "ABSOLUTE",
        "ACCEPTED",
        "CARRIERS",
        "CHANNELS",
        "CIVILIAN",
        "DISTANCE",
        "LISTENED",
        "OCCUPIED",
        "PRESSURE",
        "REGISTRY",
        "REPEATED",
        "SPINNING",
        "SUNLIGHT",
        "TRANSMIT",
      ],
      brackets: ["remove"],
      rotateOnLockout: true,
      requires: "diaries",
      unlocks: "entry-06",
      briefing: "WARNING: key rotates on lockout. Prior likeness data is void after a reset.",
      nextMessage: "entry VI decrypted. The carrier tone is still being recorded.",
    },
  });

  const nodePuzzles = Object.freeze({
    circulation: {
      title: "CIRCULATION_NODE_BRIDGE",
      start: "A3",
      end: "D1",
      columns: ["A", "B", "C", "D"],
      rows: [1, 2, 3],
      nodes: ["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2", "A3", "B3", "C3", "D3"],
      edges: [
        ["A1", "B1"],
        ["B1", "C1"],
        ["C1", "D1"],
        ["A2", "B2"],
        ["B2", "C2"],
        ["C2", "D2"],
        ["A3", "B3"],
        ["B3", "C3"],
        ["C3", "D3"],
        ["A1", "A2"],
        ["A2", "A3"],
        ["C1", "C2"],
        ["C2", "C3"],
      ],
      requires: "psych-eval",
      unlocks: "circulation",
      notes: ["Pressure residue marks: A3 B3 C3 C2 C1 D1"],
      nextMessage: "circulation bridge accepted. New report restored.",
    },
    "relay-grid": {
      title: "RELAY_GRID_NODE_BRIDGE",
      start: "P2",
      end: "Q3",
      columns: ["P", "Q", "R", "S"],
      rows: [1, 2, 3, 4],
      nodes: [
        "P1",
        "Q1",
        "R1",
        "S1",
        "P2",
        "Q2",
        "R2",
        "S2",
        "P3",
        "Q3",
        "R3",
        "S3",
        "P4",
        "Q4",
        "R4",
        "S4",
      ],
      edges: [
        ["P1", "Q1"],
        ["Q1", "R1"],
        ["R1", "S1"],
        ["P2", "Q2"],
        ["Q2", "R2"],
        ["R2", "S2"],
        ["P3", "Q3"],
        ["Q3", "R3"],
        ["R3", "S3"],
        ["P4", "Q4"],
        ["Q4", "R4"],
        ["R4", "S4"],
        ["P1", "P2"],
        ["P2", "P3"],
        ["P3", "P4"],
        ["Q1", "Q2"],
        ["Q2", "Q3"],
        ["Q3", "Q4"],
        ["R1", "R2"],
        ["R2", "R3"],
        ["R3", "R4"],
      ],
      requires: "transfer",
      unlocks: "relay-grid",
      notes: ["Relay burn order damaged. Bridge any live conduit path from P2 to Q3."],
      nextMessage: "relay-grid bridge accepted. Final report restored.",
    },
    "entry-07": {
      title: "ENTRY_VII_COMPLIANCE_CENSUS_BRIDGE",
      start: "K1",
      end: "O4",
      columns: ["K", "L", "M", "N", "O"],
      rows: [1, 2, 3, 4],
      dead: ["N2", "L3"],
      nodes: [
        "K1",
        "L1",
        "M1",
        "N1",
        "O1",
        "K2",
        "L2",
        "M2",
        "O2",
        "K3",
        "M3",
        "N3",
        "O3",
        "K4",
        "L4",
        "M4",
        "N4",
        "O4",
      ],
      // Exactly one route visits every live node once on this conduit set.
      edges: [
        ["K1", "L1"],
        ["M1", "N1"],
        ["N1", "O1"],
        ["K2", "L2"],
        ["L2", "M2"],
        ["M3", "N3"],
        ["N3", "O3"],
        ["K4", "L4"],
        ["L4", "M4"],
        ["N4", "O4"],
        ["K1", "K2"],
        ["K2", "K3"],
        ["K3", "K4"],
        ["L1", "L2"],
        ["M1", "M2"],
        ["M2", "M3"],
        ["M3", "M4"],
        ["N3", "N4"],
        ["O1", "O2"],
        ["O2", "O3"],
        ["O3", "O4"],
      ],
      census: true,
      strikes: 3,
      requires: "diaries",
      unlocks: "entry-07",
      notes: [
        "K1 = oxygen exchange    O4 = reclamation hopper",
        "Census rule: count every live node exactly once. xx = dead node.",
        "Dead ends and incomplete counts are logged as failed reviews. Three seal the panel.",
      ],
      nextMessage: "census accepted. SUBJECT IDENTITY CONFIRMED. Entry VII released.",
    },
  });

  const bootLines = [
    "DomeOS v0.4 [PATIENT ARCHIVE]",
    "patient index: damaged",
    "director records: sealed",
    "fluorescent ballast: failing",
    "Combine medical dome uplink: partial",
    "",
    "type help",
    "type patients",
  ];

  let history = [];
  let historyIndex = 0;
  let audioContext = null;
  let buzzNodes = null;
  let audioWanted = true;
  let bootTimers = [];
  const activePanels = new Map();
  let state = loadState();

  function defaultState() {
    return {
      unlockedReports: [],
      hackAttempts: {},
      hackCycles: {},
      victory: false,
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return defaultState();
      }

      const parsed = JSON.parse(raw);
      const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
      return {
        unlockedReports: Array.isArray(parsed.unlockedReports)
          ? parsed.unlockedReports.filter((id) => Object.prototype.hasOwnProperty.call(reportFiles, id))
          : [],
        hackAttempts: isObject(parsed.hackAttempts) ? parsed.hackAttempts : {},
        hackCycles: isObject(parsed.hackCycles) ? parsed.hackCycles : {},
        victory: Boolean(parsed.victory),
      };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private window, blocked site data). Progress then lasts for this page only.
    }
  }

  function resetState() {
    state = defaultState();
    saveState();
  }

  function normalizeValue(value) {
    return String(value)
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeNodePath(value) {
    return String(value)
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function reportFileList(report) {
    return Array.isArray(report.files) ? report.files : [report];
  }

  // Files are always derived from the current story data, so edits to the
  // report text reach players who unlocked them in an earlier session.
  function allFiles() {
    const files = { ...publicFiles };
    for (const id of state.unlockedReports) {
      const report = reportFiles[id];
      if (!report) {
        continue;
      }
      for (const { path, title, content } of reportFileList(report)) {
        files[path] = { title, content };
      }
    }
    return files;
  }

  function resolveFilePath(rawPath) {
    const files = allFiles();
    const paths = Object.keys(files);
    const wanted = String(rawPath || "").trim().toLowerCase().replace(/\\/g, "/");
    if (!wanted) {
      return null;
    }

    const direct = [wanted, `/${wanted}`, `${patientRoot}/${wanted}`, `/patients/${wanted}`];
    for (const candidate of direct) {
      if (files[candidate]) {
        return candidate;
      }
    }

    const suffixMatches = paths.filter((path) => path.endsWith(`/${wanted.replace(/^\/+/, "")}`));
    return suffixMatches.length === 1 ? suffixMatches[0] : null;
  }

  function print(text = "", className = "") {
    for (const lineText of String(text).split("\n")) {
      const line = document.createElement("div");
      line.className = className ? `line ${className}` : "line";
      line.textContent = lineText;
      output.appendChild(line);
    }
    output.scrollTop = output.scrollHeight;
  }

  function printBlock(lines, className = "") {
    print(lines.join("\n"), className);
  }

  function appendPanel(panel) {
    output.appendChild(panel);
    output.scrollTop = output.scrollHeight;
  }

  // Only the newest panel for a record stays live; older copies are sealed.
  function registerPanel(recordId, seal) {
    const previous = activePanels.get(recordId);
    if (previous) {
      previous("superseded by a newer session");
    }
    activePanels.set(recordId, seal);
  }

  function releasePanel(recordId, seal) {
    if (activePanels.get(recordId) === seal) {
      activePanels.delete(recordId);
    }
  }

  function makePanel(title) {
    const panel = document.createElement("div");
    panel.className = "terminal-panel";

    const heading = document.createElement("div");
    heading.className = "terminal-panel-title";
    heading.textContent = title;
    panel.appendChild(heading);

    return panel;
  }

  function makePanelLine(text, className = "") {
    const line = document.createElement("div");
    line.className = className ? `panel-line ${className}` : "panel-line";
    line.textContent = text;
    return line;
  }

  function makePanelButton(text, onClick) {
    const button = document.createElement("button");
    button.className = "terminal-button";
    button.type = "button";
    button.textContent = text;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      audioAutoplayAttempt();
      onClick(button);
    });
    return button;
  }

  function jolt() {
    document.body.classList.add("screen-jolt");
    window.setTimeout(() => document.body.classList.remove("screen-jolt"), 210);
  }

  function setAudioStatus(text, armed) {
    audioToggle.textContent = text;
    audioToggle.classList.toggle("armed", armed);
  }

  function getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      return null;
    }
    if (!audioContext) {
      audioContext = new AudioCtor();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  }

  // The <audio> element leaves a small gap every time it loops, so the music
  // is decoded once and looped sample-accurately with Web Audio instead.
  // When the file can't be fetched (e.g. the page is opened via file://),
  // it falls back to the <audio> element's own loop.
  let musicBuffer = null;
  let musicLoad = null;
  let musicSource = null;
  let musicGain = null;
  let musicFallback = false;

  function loadMusicBuffer(context) {
    if (!musicLoad) {
      const src = musicBed ? musicBed.getAttribute("src") : null;
      musicLoad = (src ? fetch(src) : Promise.reject(new Error("no music source")))
        .then((response) => {
          if (!response.ok) {
            throw new Error(`music fetch ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then((data) => context.decodeAudioData(data))
        .then((buffer) => {
          musicBuffer = buffer;
          return buffer;
        })
        .catch(() => {
          musicFallback = true;
          return null;
        });
    }
    return musicLoad;
  }

  function playMusicElement() {
    if (!musicBed) {
      return;
    }
    musicBed.volume = MUSIC_VOLUME;
    musicBed.loop = true;
    try {
      const result = musicBed.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => setAudioStatus("sound: blocked", false));
      }
    } catch {
      setAudioStatus("sound: blocked", false);
    }
  }

  function startMusic() {
    const context = getAudioContext();
    if (!context || musicFallback) {
      playMusicElement();
      return;
    }
    if (musicSource) {
      musicGain.gain.setTargetAtTime(MUSIC_VOLUME, context.currentTime, 0.05);
      return;
    }
    loadMusicBuffer(context).then((buffer) => {
      if (!buffer) {
        playMusicElement();
        return;
      }
      if (!audioWanted || musicSource) {
        return;
      }
      if (!musicGain) {
        musicGain = context.createGain();
        musicGain.connect(context.destination);
      }
      musicGain.gain.value = MUSIC_VOLUME;
      musicSource = context.createBufferSource();
      musicSource.buffer = buffer;
      musicSource.loop = true;
      musicSource.connect(musicGain);
      musicSource.start();
    });
  }

  function stopMusic() {
    if (musicSource) {
      try {
        musicSource.stop();
      } catch {
        // already stopped
      }
      musicSource.disconnect();
      musicSource = null;
    }
    if (musicBed) {
      musicBed.pause();
    }
  }

  function musicPlaying() {
    if (musicSource) {
      return Boolean(audioContext) && audioContext.state === "running";
    }
    return Boolean(musicBed) && !musicBed.paused;
  }

  function startAudio() {
    audioWanted = true;
    startMusic();
    startFluorescentBuzz();
    setAudioStatus("sound: on", true);
    // Browsers keep audio suspended until the first click or key press.
    window.setTimeout(() => {
      if (audioWanted && audioContext && audioContext.state !== "running" && !(musicBed && !musicBed.paused)) {
        setAudioStatus("sound: blocked", false);
      }
    }, 400);
  }

  function stopAudio() {
    audioWanted = false;
    stopMusic();
    if (buzzNodes) {
      buzzNodes.master.gain.setTargetAtTime(0, audioContext.currentTime, 0.04);
    }
    for (const sound of [bootSound, ...creakSounds]) {
      if (sound) {
        sound.pause();
      }
    }
    setAudioStatus("sound: off", false);
  }

  const MUSIC_VOLUME = 0.4;
  let bootSoundPending = false;

  // Radio click/hiss over the City 17 boot. Browsers may refuse sound before
  // the first click or key; it is retried when the boot is skipped or ends.
  function playBootSound() {
    if (!bootSound || !audioWanted) {
      return;
    }
    bootSoundPending = true;
    bootSound.volume = 0.75;
    bootSound.currentTime = 0;
    const result = bootSound.play();
    if (result && typeof result.then === "function") {
      result.then(() => {
        bootSoundPending = false;
      }).catch(() => {});
    } else {
      bootSoundPending = false;
    }
  }

  // Random structural creaks for atmosphere, every 25-75 seconds.
  function scheduleCreak(firstRun = false) {
    const delay = firstRun ? 14000 + Math.random() * 14000 : 25000 + Math.random() * 50000;
    window.setTimeout(() => {
      const musicRunning = musicPlaying();
      const idle = creakSounds.filter((sound) => sound.paused);
      if (audioWanted && musicRunning && !document.hidden && idle.length) {
        const sound = idle[Math.floor(Math.random() * idle.length)];
        sound.volume = 0.3 + Math.random() * 0.4;
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
      scheduleCreak();
    }, delay);
  }

  function startFluorescentBuzz() {
    if (!getAudioContext()) {
      return;
    }

    if (buzzNodes) {
      buzzNodes.master.gain.setTargetAtTime(0.018, audioContext.currentTime, 0.06);
      return;
    }

    const master = audioContext.createGain();
    master.gain.value = 0.018;
    master.connect(audioContext.destination);

    const hum = audioContext.createOscillator();
    hum.type = "sawtooth";
    hum.frequency.value = 50;
    const humGain = audioContext.createGain();
    humGain.gain.value = 0.28;

    const buzz = audioContext.createOscillator();
    buzz.type = "square";
    buzz.frequency.value = 100;
    const buzzGain = audioContext.createGain();
    buzzGain.gain.value = 0.045;

    const bufferSize = audioContext.sampleRate * 2;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < bufferSize; index += 1) {
      data[index] = (Math.random() * 2 - 1) * 0.55;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 3600;
    bandpass.Q.value = 8;

    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.018;

    hum.connect(humGain).connect(master);
    buzz.connect(buzzGain).connect(master);
    noise.connect(bandpass).connect(noiseGain).connect(master);

    hum.start();
    buzz.start();
    noise.start();

    buzzNodes = { master, hum, buzz, noise };
  }

  function audioAutoplayAttempt() {
    if (!audioWanted) {
      return;
    }
    if (musicPlaying() && buzzNodes && audioContext && audioContext.state === "running") {
      return;
    }
    startAudio();
  }

  function hasReport(id) {
    return state.unlockedReports.includes(id);
  }

  function unlockReport(id, message) {
    const report = reportFiles[id];
    if (!report) {
      return;
    }

    if (!hasReport(id)) {
      state.unlockedReports.push(id);
    }

    if (id === "relay-grid") {
      state.victory = true;
    }

    saveState();
    updateStatusBar();
    print(message || `${id} decrypted`, "success");
    for (const file of reportFileList(report)) {
      print(`restored: ${file.path}`, "success");
    }
  }

  function formatFileList() {
    const files = allFiles();
    return Object.keys(files)
      .sort((a, b) => a.localeCompare(b))
      .map((path) => `${path.padEnd(52, " ")} ${files[path].title || ""}`);
  }

  function recordLine(id, kind, command) {
    return `${id.padEnd(16, " ")}LOCKED   ${kind.padEnd(10, " ")}${command}`;
  }

  function lockedRecords() {
    const records = [];
    for (const [id, puzzle] of Object.entries(hackPuzzles)) {
      if (canHack(id) && !hasReport(puzzle.unlocks)) {
        records.push(recordLine(id, puzzle.rotateOnLockout ? "rotating" : "lexical", `hack ${id}`));
      }
    }
    for (const [id, puzzle] of Object.entries(nodePuzzles)) {
      if (canConnect(id) && !hasReport(puzzle.unlocks)) {
        records.push(recordLine(id, puzzle.census ? "census" : "node", `connect ${id}`));
      }
    }
    return records;
  }

  function showHelp() {
    printBlock([
      "commands",
      "  help                         list commands",
      "  patients                     list patient index",
      "  open <patient-id>            open patient directory",
      "  scan                         list files and active encrypted records",
      "  ls                           list readable files",
      "  cat <file>                   read file (full path or file name)",
      "  hack <record> [word]         open interactive likeness lock",
      "  connect <node> [path]        open interactive node bridge",
      "  audio on|off                 toggle music and fluorescent buzz",
      "  clear                        wipe visible terminal",
      "  reset                        erase local progress",
    ]);
  }

  function showPatients() {
    showFile("/patients/index.txt");
  }

  function openPatient(patientId) {
    const normalized = normalizeValue(patientId).replace(/\s+/g, "-");
    if (!normalized) {
      print("usage: open <patient-id>", "warn");
      return;
    }

    if (normalized === "alec-b-wreelan" || normalized === "p-377" || normalized === "p-377-alec-b-wreelan") {
      print("opening patient P-377 / ALEC B. WREELAN", "system");
      showFile(`${patientRoot}/manifest.txt`);
      return;
    }

    if (normalized === "dima-kovac" || normalized === "p-091") {
      showFile("/patients/dima-kovac/summary.txt");
      return;
    }

    if (normalized === "mira-voss" || normalized === "p-117") {
      showFile("/patients/mira-voss/summary.txt");
      return;
    }

    print("patient not found or directory purged", "error");
    jolt();
  }

  function showScan() {
    print("READABLE FILES", "system");
    printBlock(formatFileList());
    print("");
    print("P-377 ENCRYPTED RECORDS", "system");
    const locked = lockedRecords();
    if (locked.length) {
      printBlock(locked);
    } else {
      print("none; patient sequence exhausted", "success");
    }
    print("");
    print("ACTIVE NODE MAPS", "system");
    const maps = Object.keys(nodePuzzles).filter((id) => canConnect(id) && !hasReport(nodePuzzles[id].unlocks));
    if (!maps.length) {
      print("none");
    }
    for (const id of maps) {
      print(`[${id}]`, "system");
      print(renderNodeDiagram(nodePuzzles[id]));
      print("");
    }
  }

  function showFile(rawPath) {
    if (!rawPath) {
      print("usage: cat <file>", "warn");
      return;
    }
    const path = resolveFilePath(rawPath);
    if (!path) {
      print(`file not found: ${rawPath}`, "error");
      jolt();
      return;
    }
    print(allFiles()[path].content);
  }

  /* ---------- lexical locks ---------- */

  function likeness(candidate, target) {
    const a = candidate.toUpperCase();
    const b = target.toUpperCase();
    let score = 0;
    for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
      if (a[index] === b[index]) {
        score += 1;
      }
    }
    return score;
  }

  function hackCycle(recordId) {
    return state.hackCycles[recordId] || 0;
  }

  function puzzleTarget(recordId) {
    const puzzle = hackPuzzles[recordId];
    if (Array.isArray(puzzle.targets)) {
      // Each player starts on a random key so a shared answer is useless.
      if (!Number.isInteger(state.hackCycles[recordId])) {
        state.hackCycles[recordId] = Math.floor(Math.random() * puzzle.targets.length);
        saveState();
      }
      return puzzle.targets[hackCycle(recordId) % puzzle.targets.length].toUpperCase();
    }
    return puzzle.target.toUpperCase();
  }

  function canHack(recordId) {
    const puzzle = hackPuzzles[recordId];
    return Boolean(puzzle) && (!puzzle.requires || hasReport(puzzle.requires));
  }

  function remainingAttempts(recordId, puzzle) {
    return Math.max(0, puzzle.attempts - (state.hackAttempts[recordId] || 0));
  }

  function renderHackPanel(recordId) {
    const puzzle = hackPuzzles[recordId];
    const target = puzzleTarget(recordId);
    const cycle = hackCycle(recordId);

    const panel = makePanel(puzzle.title);
    panel.classList.add("fallout-panel");

    const header = document.createElement("div");
    header.className = "fallout-header";
    header.textContent = puzzle.rotateOnLockout
      ? `COMBINE OVERWATCH TERMLINK // KEY CYCLE ${String(cycle + 1).padStart(2, "0")}`
      : "COMBINE OVERWATCH TERMLINK PROTOCOL";

    const attempts = document.createElement("div");
    attempts.className = "fallout-attempts";

    const status = document.createElement("div");
    status.className = "fallout-status";
    status.textContent = puzzle.briefing ? `ENTER PASSWORD NOW  ${puzzle.briefing}` : "ENTER PASSWORD NOW";

    const dump = document.createElement("div");
    dump.className = "fallout-memory";

    const log = document.createElement("div");
    log.className = "fallout-log";
    log.appendChild(makePanelLine(">"));
    log.appendChild(makePanelLine("> Password Required"));

    let sealed = false;

    function refreshAttempts() {
      const remaining = remainingAttempts(recordId, puzzle);
      attempts.textContent = `Attempts Remaining: ${"■ ".repeat(remaining).trim() || "-"}`;
    }

    function appendLog(text, className = "") {
      const line = makePanelLine(`> ${text}`, className);
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }

    function seal(reason) {
      if (sealed) {
        return;
      }
      sealed = true;
      for (const button of dump.querySelectorAll("button")) {
        button.disabled = true;
      }
      if (reason) {
        status.textContent = "SESSION CLOSED";
        appendLog(reason);
      }
      releasePanel(recordId, seal);
    }

    function removeDud() {
      const wrongWords = Array.from(dump.querySelectorAll(".memory-token.word:not(:disabled)")).filter(
        (button) => button.dataset.word !== target,
      );
      const dud = wrongWords[Math.floor(Math.random() * wrongWords.length)];
      if (!dud) {
        appendLog("No dud words remaining");
        return;
      }
      dud.disabled = true;
      dud.textContent = ".".repeat(dud.dataset.word.length);
      appendLog("Dud removed");
    }

    function replenishAllowance() {
      state.hackAttempts[recordId] = Math.max(0, (state.hackAttempts[recordId] || 0) - 1);
      saveState();
      refreshAttempts();
      appendLog("Allowance replenished");
    }

    for (const rowData of buildMemoryDump(puzzle, target, cycle)) {
      const row = document.createElement("div");
      row.className = "memory-row";

      for (const cell of rowData) {
        const address = document.createElement("span");
        address.className = "memory-address";
        address.textContent = cell.address;

        const chars = document.createElement("span");
        chars.className = "memory-chars";

        for (const part of cell.parts) {
          if (part.type === "word") {
            const button = document.createElement("button");
            button.className = "memory-token word";
            button.type = "button";
            button.textContent = part.text;
            button.dataset.word = part.text;
            button.addEventListener("click", (event) => {
              event.stopPropagation();
              audioAutoplayAttempt();
              if (sealed || button.disabled || hasReport(puzzle.unlocks)) {
                return;
              }
              appendLog(part.text);
              const result = resolveHackGuess(recordId, part.text, { quiet: true });
              if (result.solved) {
                status.textContent = "ACCESS GRANTED";
                appendLog("Exact match!", "success");
                seal();
                return;
              }
              appendLog("Entry denied");
              appendLog(`Likeness=${result.likeness}/${target.length}`);
              button.disabled = true;
              refreshAttempts();
              if (result.lockedOut) {
                status.textContent = "TERMINAL LOCKED";
                appendLog("Lockout initiated", "error");
                appendLog(
                  puzzle.rotateOnLockout
                    ? `Key rotated. Run: hack ${recordId}`
                    : `Lock memory cycled. Run: hack ${recordId}`,
                );
                refreshAttempts();
                seal();
              }
            });
            chars.appendChild(button);
          } else if (part.type === "bracket") {
            const button = document.createElement("button");
            button.className = "memory-token bracket";
            button.type = "button";
            button.textContent = part.text;
            button.addEventListener("click", (event) => {
              event.stopPropagation();
              audioAutoplayAttempt();
              if (sealed || button.disabled) {
                return;
              }
              button.disabled = true;
              if (part.effect === "replenish") {
                replenishAllowance();
              } else {
                removeDud();
              }
            });
            chars.appendChild(button);
          } else {
            chars.appendChild(document.createTextNode(part.text));
          }
        }

        row.appendChild(address);
        row.appendChild(chars);
      }

      dump.appendChild(row);
    }

    registerPanel(recordId, seal);
    refreshAttempts();
    panel.appendChild(header);
    panel.appendChild(attempts);
    panel.appendChild(status);
    panel.appendChild(dump);
    panel.appendChild(log);
    appendPanel(panel);
  }

  function buildMemoryDump(puzzle, target, cycle) {
    const seedText = `${target}:${cycle}`;
    const words = deterministicShuffle(puzzle.candidates, seedText, target);
    const bracketText = ["<{}>", "[!!]", "(..)", "{<>}", "<[]>"];
    const effects = puzzle.brackets || ["remove", "remove", "remove", "replenish"];
    const cellCount = 48;
    const inserts = [
      ...words.map((word) => ({ type: "word", text: word })),
      ...effects.map((effect, index) => ({ type: "bracket", text: bracketText[index % bracketText.length], effect })),
    ];
    const slots = spreadSlots(inserts.length, cellCount, seedText);
    const filler = "!@#$%^&*()-_=+[]{};:,.<>/?\\|";
    const cells = [];

    for (let index = 0; index < cellCount; index += 1) {
      const parts = [];
      const slotIndex = slots.indexOf(index);
      const insert = slotIndex >= 0 ? inserts[slotIndex] : null;
      const fillerSeed = index + cycle * 7;
      if (insert) {
        const beforeLength = 1 + ((index * 5) % Math.max(2, 11 - insert.text.length));
        const afterLength = Math.max(0, 12 - beforeLength - insert.text.length);
        parts.push({ type: "text", text: randomFiller(filler, beforeLength, fillerSeed) });
        parts.push(insert);
        parts.push({ type: "text", text: randomFiller(filler, afterLength, fillerSeed + 13) });
      } else {
        parts.push({ type: "text", text: randomFiller(filler, 12, fillerSeed + 23) });
      }
      cells.push({
        address: `0x${(0xf420 + index * 12).toString(16).toUpperCase()}`,
        parts,
      });
    }

    const rows = [];
    for (let index = 0; index < cells.length; index += 2) {
      rows.push([cells[index], cells[index + 1]]);
    }
    return rows;
  }

  function seedFrom(text) {
    let seed = 7;
    for (const char of text) {
      seed = (seed * 31 + char.charCodeAt(0)) % 233280;
    }
    return seed;
  }

  function deterministicShuffle(items, seedText, avoidFirst) {
    const result = [...items];
    let seed = seedFrom(seedText);

    for (let index = result.length - 1; index > 0; index -= 1) {
      seed = (seed * 9301 + 49297) % 233280;
      const swapIndex = seed % (index + 1);
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }

    if (avoidFirst && typeof result[0] === "string" && result[0].toUpperCase() === avoidFirst.toUpperCase()) {
      const swapWith = Math.min(3, result.length - 1);
      [result[0], result[swapWith]] = [result[swapWith], result[0]];
    }

    return result;
  }

  function spreadSlots(count, total, seedText) {
    const slots = [];
    let seed = seedFrom(seedText);
    const spacing = total / count;

    for (let index = 0; index < count; index += 1) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const jitterRange = Math.max(1, Math.floor(spacing / 2));
      const jitter = (seed % (jitterRange * 2 + 1)) - jitterRange;
      const slot = Math.max(1, Math.min(total - 2, Math.floor(index * spacing + spacing / 2 + jitter)));
      let finalSlot = slot;
      while (slots.includes(finalSlot)) {
        finalSlot = (finalSlot + 1) % total;
      }
      slots.push(finalSlot);
    }

    return deterministicShuffle(slots, `${seedText}-slots`);
  }

  function randomFiller(characters, length, seed) {
    let text = "";
    for (let index = 0; index < length; index += 1) {
      text += characters[(seed * 7 + index * 11) % characters.length];
    }
    return text;
  }

  function resolveHackGuess(recordId, word, { quiet = false } = {}) {
    const puzzle = hackPuzzles[recordId];
    const guess = word.toUpperCase();
    const target = puzzleTarget(recordId);

    if (!puzzle.candidates.includes(guess)) {
      print("word not present in lock memory", "error");
      jolt();
      return { solved: false, lockedOut: false, likeness: 0 };
    }

    if (guess === target) {
      delete state.hackAttempts[recordId];
      delete state.hackCycles[recordId];
      unlockReport(puzzle.unlocks, puzzle.nextMessage);
      return { solved: true, lockedOut: false, likeness: target.length };
    }

    const attempts = (state.hackAttempts[recordId] || 0) + 1;
    state.hackAttempts[recordId] = attempts;
    const remaining = Math.max(0, puzzle.attempts - attempts);
    const score = likeness(guess, target);
    jolt();

    if (!quiet) {
      print(`entry denied: ${guess} likeness ${score}/${target.length}`, "warn");
      print(`attempts remaining: ${remaining}`, remaining ? "warn" : "error");
    }

    if (!remaining) {
      state.hackAttempts[recordId] = 0;
      if (puzzle.rotateOnLockout) {
        state.hackCycles[recordId] = hackCycle(recordId) + 1;
        print(`${recordId}: lockout. key rotated; previous likeness data void.`, "error");
      } else {
        print(`${recordId}: lock memory cycled; attempts reset`, "system");
      }
    }

    saveState();
    return { solved: false, lockedOut: !remaining, likeness: score };
  }

  function hack(recordId, word) {
    if (!recordId) {
      print("usage: hack <record> [word]", "warn");
      return;
    }

    const puzzle = hackPuzzles[recordId];
    if (!puzzle) {
      print("lexical lock not found", "error");
      jolt();
      return;
    }

    if (!canHack(recordId)) {
      print("record dependency missing", "error");
      jolt();
      return;
    }

    if (hasReport(puzzle.unlocks)) {
      print("record already decrypted", "system");
      return;
    }

    if (!word) {
      renderHackPanel(recordId);
      return;
    }

    resolveHackGuess(recordId, word);
  }

  /* ---------- node bridges ---------- */

  function canConnect(nodeId) {
    const puzzle = nodePuzzles[nodeId];
    return Boolean(puzzle) && (!puzzle.requires || hasReport(puzzle.requires));
  }

  function gridAxes(puzzle) {
    const all = [...puzzle.nodes, ...(puzzle.dead || [])];
    const columns = puzzle.columns || Array.from(new Set(all.map((node) => node[0]))).sort();
    const rows = puzzle.rows || Array.from(new Set(all.map((node) => Number(node.slice(1))))).sort((a, b) => a - b);
    return { columns, rows };
  }

  function nodePosition(nodeName, puzzle) {
    const { columns, rows } = gridAxes(puzzle);
    const columnIndex = columns.indexOf(nodeName[0]);
    const rowIndex = rows.indexOf(Number(nodeName.slice(1)));
    const width = columns.length > 4 ? 500 : 420;
    const height = rows.length > 3 ? 310 : 250;
    const xPad = 52;
    const yPad = 48;
    const x = xPad + columnIndex * ((width - xPad * 2) / Math.max(1, columns.length - 1));
    const y = yPad + rowIndex * ((height - yPad * 2) / Math.max(1, rows.length - 1));
    return { x, y, width, height };
  }

  function edgeKey(a, b) {
    return [a, b].sort().join("::");
  }

  function areNodesConnected(puzzle, a, b) {
    const key = edgeKey(a, b);
    return puzzle.edges.some(([left, right]) => edgeKey(left, right) === key);
  }

  function neighbors(puzzle, nodeName) {
    return puzzle.nodes.filter((other) => other !== nodeName && areNodesConnected(puzzle, nodeName, other));
  }

  function renderNodeDiagram(puzzle) {
    const { columns, rows } = gridAxes(puzzle);
    const dead = new Set(puzzle.dead || []);
    const lines = [];

    rows.forEach((row, rowIndex) => {
      let nodeLine = "";
      let linkLine = "";
      columns.forEach((column, columnIndex) => {
        const name = `${column}${row}`;
        nodeLine += dead.has(name) ? "xx" : name.padEnd(2, " ");
        if (columnIndex < columns.length - 1) {
          const right = `${columns[columnIndex + 1]}${row}`;
          nodeLine += areNodesConnected(puzzle, name, right) ? " -- " : "    ";
        }
        const below = rowIndex < rows.length - 1 ? `${column}${rows[rowIndex + 1]}` : null;
        linkLine += (below && areNodesConnected(puzzle, name, below) ? "|" : " ").padEnd(6, " ");
      });
      lines.push(nodeLine.trimEnd());
      if (rowIndex < rows.length - 1) {
        lines.push(linkLine.trimEnd());
      }
    });

    lines.push("", `Start: ${puzzle.start}`, `End:   ${puzzle.end}`, ...(puzzle.notes || []));
    return lines.join("\n");
  }

  // Returns null when the path is valid, otherwise a reason string.
  function nodePathProblem(puzzle, path) {
    if (path.length < 2 || path[0] !== puzzle.start || path[path.length - 1] !== puzzle.end) {
      return `bridge must run from ${puzzle.start} to ${puzzle.end}`;
    }
    const unknown = path.find((node) => !puzzle.nodes.includes(node));
    if (unknown) {
      return `${unknown} is not a live node`;
    }
    for (let index = 1; index < path.length; index += 1) {
      if (!areNodesConnected(puzzle, path[index - 1], path[index])) {
        return `no conduit between ${path[index - 1]} and ${path[index]}`;
      }
    }
    if (puzzle.census) {
      if (new Set(path).size !== path.length) {
        return "census violation: node counted twice";
      }
      if (path.length !== puzzle.nodes.length) {
        return `census incomplete: ${path.length}/${puzzle.nodes.length} nodes counted`;
      }
    }
    return null;
  }

  function renderNodePanel(nodeId) {
    const puzzle = nodePuzzles[nodeId];
    const selected = [];
    const maxStrikes = puzzle.strikes || 0;
    let strikes = 0;
    let sealed = false;

    const panel = makePanel(puzzle.title);
    const status = makePanelLine("PATH: [empty]");
    const strikeLine = makePanelLine("");
    panel.appendChild(status);
    if (maxStrikes) {
      panel.appendChild(strikeLine);
    }

    const map = document.createElement("div");
    map.className = "node-map";

    const svgNs = "http://www.w3.org/2000/svg";
    const firstPos = nodePosition(puzzle.nodes[0], puzzle);
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("viewBox", `0 0 ${firstPos.width} ${firstPos.height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${puzzle.title} node map`);

    const conduitLayer = document.createElementNS(svgNs, "g");
    conduitLayer.setAttribute("class", "node-conduits");
    const activeLayer = document.createElementNS(svgNs, "g");
    activeLayer.setAttribute("class", "node-active-lines");
    const nodeLayer = document.createElementNS(svgNs, "g");
    nodeLayer.setAttribute("class", "node-points");

    function drawLine(layer, from, to, className) {
      const fromPos = nodePosition(from, puzzle);
      const toPos = nodePosition(to, puzzle);
      const line = document.createElementNS(svgNs, "line");
      line.setAttribute("x1", fromPos.x);
      line.setAttribute("y1", fromPos.y);
      line.setAttribute("x2", toPos.x);
      line.setAttribute("y2", toPos.y);
      line.setAttribute("class", className);
      layer.appendChild(line);
    }

    function refreshStrikes() {
      const left = maxStrikes - strikes;
      strikeLine.textContent = `REVIEWS REMAINING: ${"■ ".repeat(left).trim() || "-"}   COUNTED: ${
        new Set(selected).size
      }/${puzzle.nodes.length}`;
    }

    function redrawActivePath() {
      activeLayer.textContent = "";
      for (let index = 1; index < selected.length; index += 1) {
        drawLine(activeLayer, selected[index - 1], selected[index], "active-conduit");
      }
      status.textContent = `PATH: ${selected.join(" ") || "[empty]"}`;
      for (const point of nodeLayer.querySelectorAll(".node-point")) {
        const nodeName = point.getAttribute("data-node");
        point.classList.toggle("selected", selected.includes(nodeName));
        point.classList.toggle("current", selected[selected.length - 1] === nodeName);
      }
      if (maxStrikes) {
        refreshStrikes();
      }
    }

    function seal(reason) {
      if (sealed) {
        return;
      }
      sealed = true;
      for (const point of nodeLayer.querySelectorAll(".node-point")) {
        point.classList.add("locked");
        point.setAttribute("tabindex", "-1");
      }
      for (const button of panel.querySelectorAll("button")) {
        button.disabled = true;
      }
      if (reason) {
        panel.appendChild(makePanelLine(`SESSION CLOSED: ${reason}`, "error"));
      }
      releasePanel(nodeId, seal);
    }

    function failReview(reason) {
      strikes += 1;
      print(`review failed: ${reason}`, "error");
      jolt();
      selected.length = 0;
      redrawActivePath();
      if (strikes >= maxStrikes) {
        print("PENDING REVIEW. census panel sealed.", "error");
        print(`reopen with: connect ${nodeId}`, "system");
        seal("PENDING REVIEW");
      }
    }

    function trySubmit() {
      if (puzzle.census) {
        const problem = nodePathProblem(puzzle, selected);
        if (problem) {
          failReview(problem);
          return;
        }
      }
      if (resolveNodePath(nodeId, selected)) {
        panel.appendChild(makePanelLine("BRIDGE ACCEPTED", "success"));
        seal();
      }
    }

    function chooseNode(nodeName) {
      if (sealed || hasReport(puzzle.unlocks)) {
        return;
      }

      const previous = selected[selected.length - 1];
      if (previous === nodeName) {
        return;
      }

      if (!selected.length && nodeName !== puzzle.start) {
        print(`bridge must start at ${puzzle.start}`, "warn");
        jolt();
        return;
      }

      if (previous && !areNodesConnected(puzzle, previous, nodeName)) {
        print(`no conduit between ${previous} and ${nodeName}`, "error");
        jolt();
        return;
      }

      if (puzzle.census && selected.includes(nodeName)) {
        print(`${nodeName} already counted; census forbids recounting`, "warn");
        jolt();
        return;
      }

      selected.push(nodeName);
      redrawActivePath();

      if (puzzle.census) {
        const complete = selected.length === puzzle.nodes.length;
        if (nodeName === puzzle.end) {
          if (complete) {
            trySubmit();
          } else {
            failReview(`reached ${puzzle.end} with ${selected.length}/${puzzle.nodes.length} nodes counted`);
          }
          return;
        }
        const open = neighbors(puzzle, nodeName).filter((other) => !selected.includes(other));
        if (!open.length) {
          failReview(`dead end at ${nodeName}; SUBJECT IDENTITY UNCONFIRMED`);
        }
        return;
      }

      if (nodeName === puzzle.end) {
        trySubmit();
      }
    }

    for (const [from, to] of puzzle.edges) {
      drawLine(conduitLayer, from, to, "base-conduit");
    }

    for (const deadName of puzzle.dead || []) {
      const { x, y } = nodePosition(deadName, puzzle);
      const mark = document.createElementNS(svgNs, "text");
      mark.setAttribute("x", x);
      mark.setAttribute("y", y + 5);
      mark.setAttribute("class", "node-dead");
      mark.textContent = "xx";
      nodeLayer.appendChild(mark);
    }

    for (const nodeName of puzzle.nodes) {
      const { x, y } = nodePosition(nodeName, puzzle);
      const group = document.createElementNS(svgNs, "g");
      group.setAttribute("class", "node-point");
      group.setAttribute("data-node", nodeName);
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", `node ${nodeName}`);

      const ring = document.createElementNS(svgNs, "circle");
      ring.setAttribute("cx", x);
      ring.setAttribute("cy", y);
      ring.setAttribute("r", 18);

      const label = document.createElementNS(svgNs, "text");
      label.setAttribute("x", x);
      label.setAttribute("y", y + 5);
      label.textContent = nodeName;

      group.appendChild(ring);
      group.appendChild(label);
      group.addEventListener("click", (event) => {
        event.stopPropagation();
        audioAutoplayAttempt();
        chooseNode(nodeName);
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          chooseNode(nodeName);
        }
      });
      nodeLayer.appendChild(group);
    }

    svg.appendChild(conduitLayer);
    svg.appendChild(activeLayer);
    svg.appendChild(nodeLayer);
    map.appendChild(svg);

    const instructions = puzzle.census
      ? `Census ${puzzle.start} to ${puzzle.end}: count every live node exactly once.`
      : `Connect ${puzzle.start} to ${puzzle.end}. Click adjacent nodes to draw the bridge.`;
    panel.appendChild(makePanelLine(instructions));
    for (const note of puzzle.notes || []) {
      panel.appendChild(makePanelLine(note));
    }
    panel.appendChild(map);

    const controls = document.createElement("div");
    controls.className = "panel-controls";
    controls.appendChild(makePanelButton("SUBMIT PATH", () => trySubmit()));
    controls.appendChild(
      makePanelButton("BACKSPACE", () => {
        selected.pop();
        redrawActivePath();
      }),
    );
    controls.appendChild(
      makePanelButton("CLEAR", () => {
        selected.length = 0;
        redrawActivePath();
      }),
    );

    panel.appendChild(controls);
    registerPanel(nodeId, seal);
    redrawActivePath();
    appendPanel(panel);
  }

  function resolveNodePath(nodeId, path) {
    const puzzle = nodePuzzles[nodeId];
    const problem = nodePathProblem(puzzle, path);

    if (problem) {
      print(`bridge rejected: ${problem}`, "error");
      print(`received: ${path.join(" ") || "empty"}`, "warn");
      jolt();
      return false;
    }

    unlockReport(puzzle.unlocks, puzzle.nextMessage);
    const panelSeal = activePanels.get(nodeId);
    if (panelSeal) {
      panelSeal();
    }
    return true;
  }

  function connectNode(nodeId, rawPath) {
    if (!nodeId) {
      print("usage: connect <node> [path]", "warn");
      return;
    }

    const puzzle = nodePuzzles[nodeId];
    if (!puzzle) {
      print("node bridge not found", "error");
      jolt();
      return;
    }

    if (!canConnect(nodeId)) {
      print("node dependency missing", "error");
      jolt();
      return;
    }

    if (hasReport(puzzle.unlocks)) {
      print("node bridge already accepted", "system");
      return;
    }

    if (!rawPath) {
      renderNodePanel(nodeId);
      return;
    }

    resolveNodePath(nodeId, normalizeNodePath(rawPath));
  }

  /* ---------- command loop ---------- */

  function handleCommand(rawValue) {
    audioAutoplayAttempt();
    const raw = rawValue.trim();
    if (!raw) {
      return;
    }

    history.push(raw);
    historyIndex = history.length;
    print(`> ${raw}`, "command");

    const parts = raw.split(/\s+/);
    const verb = parts.shift().toLowerCase();

    switch (verb) {
      case "help":
      case "?":
        showHelp();
        break;
      case "patients":
      case "patient":
        showPatients();
        break;
      case "open":
        openPatient(parts.join(" "));
        break;
      case "scan":
      case "status":
        showScan();
        break;
      case "ls":
      case "dir":
        printBlock(formatFileList());
        break;
      case "cat":
      case "read":
        showFile(parts.join(" "));
        break;
      case "hack": {
        const recordId = (parts.shift() || "").toLowerCase();
        hack(recordId, parts.join(" "));
        break;
      }
      case "connect": {
        const nodeId = (parts.shift() || "").toLowerCase();
        connectNode(nodeId, parts.join(" "));
        break;
      }
      case "audio":
        if ((parts[0] || "on").toLowerCase() === "off") {
          stopAudio();
        } else {
          startAudio();
        }
        break;
      case "clear":
      case "cls":
        cancelBoot();
        output.textContent = "";
        break;
      case "reset":
        resetState();
        for (const sealPanel of Array.from(activePanels.values())) {
          sealPanel();
        }
        updateStatusBar();
        boot();
        break;
      default:
        print(`bad command or file not executable: ${verb}`, "error");
        print("type help", "system");
        jolt();
    }
  }

  function cancelBoot() {
    for (const timer of bootTimers) {
      window.clearTimeout(timer);
    }
    bootTimers = [];
  }

  function later(callback, delay) {
    bootTimers.push(window.setTimeout(callback, delay));
  }

  function typeInto(element, text, startDelay, perChar) {
    element.textContent = "";
    Array.from(text).forEach((char, index) => {
      later(() => {
        element.textContent += char;
      }, startDelay + index * perChar);
    });
  }

  function printBootLines() {
    let delay = 0;
    for (const line of bootLines) {
      later(() => print(line, "system"), delay);
      delay += line ? 95 + Math.floor(Math.random() * 85) : 60;
    }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let bootPhase = "done";

  // City 17 mark spins up and locks, flashes, then the terminal tube powers on.
  function boot() {
    cancelBoot();
    output.textContent = "";
    if (!bootScreen || !terminalShell || !bootFlash) {
      // Older/cached markup without the boot screen: fall back to text boot.
      bootPhase = "done";
      printBootLines();
      input.focus();
      return;
    }
    bootPhase = "logo";
    playBootSound();
    input.disabled = true;
    terminalShell.setAttribute("aria-hidden", "true");
    terminalShell.classList.remove("power-on");
    bootFlash.classList.remove("go");
    bootScreen.hidden = false;
    bootScreen.classList.remove("run", "locked");
    void bootScreen.offsetWidth; // restart the CSS animations
    bootScreen.classList.add("run");

    typeInto(bootTitle, "CITY 17", reducedMotion ? 0 : 1900, 70);
    typeInto(bootSub, "PERSONAL INFORMATION PORTAL", reducedMotion ? 0 : 2300, 24);
    later(() => bootScreen.classList.add("locked"), reducedMotion ? 300 : 2900);
    later(finishBoot, reducedMotion ? 1200 : 3700);
  }

  function finishBoot() {
    if (bootPhase !== "logo") {
      return;
    }
    cancelBoot();
    bootPhase = "terminal";
    if (bootSoundPending) {
      playBootSound();
    }
    bootFlash.classList.remove("go");
    void bootFlash.offsetWidth;
    bootFlash.classList.add("go");

    later(() => {
      bootScreen.hidden = true;
      bootScreen.classList.remove("run", "locked");
      terminalShell.removeAttribute("aria-hidden");
      terminalShell.classList.add("power-on");
      input.disabled = false;
      input.focus();
      later(printBootLines, reducedMotion ? 0 : 420);
      bootPhase = "done";
    }, reducedMotion ? 0 : 110);
  }

  function skipBoot(event) {
    if (bootPhase !== "logo") {
      return;
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    finishBoot();
  }

  function updateStatusBar() {
    if (!statusRecords) {
      return;
    }
    const total = Object.keys(reportFiles).length;
    const opened = state.unlockedReports.filter((id) => reportFiles[id]).length;
    statusRecords.textContent = `records ${opened}/${total}`;
  }

  function updateClock() {
    if (!statusClock) {
      return;
    }
    const now = new Date();
    statusClock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
  }

  function completionsFor(value) {
    const fileCompletions = Object.keys(allFiles()).map((path) => `cat ${path}`);
    const hackCompletions = Object.keys(hackPuzzles)
      .filter((id) => canHack(id))
      .map((id) => `hack ${id} `);
    const connectCompletions = Object.keys(nodePuzzles)
      .filter((id) => canConnect(id))
      .map((id) => `connect ${id} `);
    return [
      "help",
      "patients",
      "open alec-b-wreelan",
      "scan",
      "ls",
      ...hackCompletions,
      ...connectCompletions,
      ...fileCompletions,
    ].find((item) => item.startsWith(value));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    input.value = "";
    handleCommand(command);
  });

  input.addEventListener("keydown", (event) => {
    audioAutoplayAttempt();

    if (event.key === "ArrowUp") {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || "";
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || "";
      input.setSelectionRange(input.value.length, input.value.length);
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const match = completionsFor(input.value.trimStart());
      if (match) {
        input.value = match;
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  });

  // The audio toggle handles its own clicks; letting pointerdown start audio
  // first made a click on "sound: blocked" turn sound on and straight back off.
  document.addEventListener("pointerdown", (event) => {
    if (!audioToggle.contains(event.target)) {
      audioAutoplayAttempt();
    }
  });
  document.addEventListener("click", () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      input.focus();
    }
  });
  audioToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (audioWanted && musicPlaying()) {
      stopAudio();
    } else {
      startAudio();
    }
  });

  window.setInterval(() => {
    if (Math.random() > 0.55) {
      jolt();
    }
  }, 4200);

  if (bootScreen) {
    bootScreen.addEventListener("click", skipBoot);
  }
  document.addEventListener("keydown", (event) => {
    if (bootPhase === "logo") {
      audioAutoplayAttempt();
      skipBoot(event);
    }
  });

  if (musicBed) {
    musicBed.loop = true;
    musicBed.volume = MUSIC_VOLUME;
  }
  updateStatusBar();
  updateClock();
  window.setInterval(updateClock, 1000);
  audioAutoplayAttempt();
  boot();
  scheduleCreak(true);
})();
