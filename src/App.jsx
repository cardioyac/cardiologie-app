import { useState, useMemo, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gkkkiwvbvubzazdpjpea.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdra2tpd3ZidnViemF6ZHBqcGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTA4NjYsImV4cCI6MjA5ODEyNjg2Nn0.hoODoh83OQawIpqjTvq3Y0vQaPVZFPsoWwkKN2LSZCs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const ADMIN_PASSWORD = "cardio2024";

const cardiologyTopics = [
  {
    id: 1, letter: "A", title: "Arythmie cardiaque", subtitle: "Troubles du rythme",
    tags: ["ECG", "Holter", "Antiarythmiques"], icon: "⚡",
    epidemiologie: "Les arythmies cardiaques touchent des millions de personnes dans le monde. La fibrillation auriculaire, forme la plus fréquente, affecte environ 1 à 2 % de la population générale, avec une prévalence croissante avec l'âge.",
    physiopathologie: "Les arythmies résultent d'anomalies de la formation ou de la conduction de l'influx électrique cardiaque. Elles peuvent être dues à un automatisme anormal, à des phénomènes de réentrée ou à des troubles de la conduction auriculo-ventriculaire.",
    diagnostique: "L'ECG de surface est l'examen clé. Un holter-ECG sur 24h ou plus permet de capturer des arythmies paroxystiques. L'exploration électrophysiologique (EEP) est indiquée dans les formes complexes.",
    traitement: "Le traitement dépend du type d'arythmie : antiarythmiques (bêtabloquants, amiodarone), cardioversion électrique, ablation par radiofréquence ou implantation d'un pacemaker ou défibrillateur selon les cas.",
  },
  {
    id: 2, letter: "A", title: "Athérosclérose", subtitle: "Maladie artérielle",
    tags: ["Statines", "Plaque", "LDL"], icon: "🩸",
    epidemiologie: "Première cause de mortalité cardiovasculaire dans les pays occidentaux. Elle débute dès l'enfance et progresse silencieusement pendant des décennies avant de se manifester cliniquement à l'âge adulte.",
    physiopathologie: "Formation de plaques d'athérome dans la paroi artérielle par accumulation de lipides, de cellules inflammatoires et de tissu fibreux. La rupture de plaque déclenche une thrombose aiguë responsable des syndromes coronariens aigus.",
    diagnostique: "Bilan lipidique (LDL, HDL, triglycérides), échographie vasculaire (épaisseur intima-média), score calcique coronaire, coronarographie en cas de suspicion de coronaropathie.",
    traitement: "Statines (réduction du LDL), antiagrégants plaquettaires, contrôle des facteurs de risque (HTA, diabète, tabagisme), régime méditerranéen, activité physique régulière et revascularisation si nécessaire.",
  },
  {
    id: 3, letter: "B", title: "Bloc auriculo-ventriculaire", subtitle: "Trouble de conduction",
    tags: ["BAV", "ECG", "Pacemaker"], icon: "🔌",
    epidemiologie: "Le BAV du premier degré est fréquent (environ 1–2 % de la population générale). Les BAV de haut degré sont plus rares mais potentiellement graves, surtout chez le sujet âgé ou en contexte d'infarctus.",
    physiopathologie: "Ralentissement ou interruption de la transmission de l'influx électrique entre oreillettes et ventricules au niveau du nœud auriculo-ventriculaire ou du faisceau de His. Peut être fonctionnel, dégénératif, ischémique ou médicamenteux.",
    diagnostique: "ECG : allongement du PR (BAV 1°), ondes P bloquées avec ou sans progression (BAV 2° Mobitz I ou II), dissociation auriculo-ventriculaire complète (BAV 3°). Holter-ECG pour les formes paroxystiques.",
    traitement: "BAV 1° : surveillance. BAV 2° Mobitz II et BAV 3° : implantation d'un pacemaker définitif. En urgence : atropine IV ou entraînement électrosystolique externe.",
  },
  {
    id: 4, letter: "C", title: "Cardiomyopathie dilatée", subtitle: "Maladie du myocarde",
    tags: ["Échocardiographie", "FE", "IEC"], icon: "🫀",
    epidemiologie: "Prévalence estimée à 1 sur 250 à 500 personnes. Principale indication de transplantation cardiaque dans les pays développés. Touche préférentiellement l'homme entre 20 et 60 ans.",
    physiopathologie: "Dilatation et dysfonction systolique du ventricule gauche sans cause coronarienne ou valvulaire. Origine génétique (25–35 %), virale (myocardite), toxique (alcool, anthracyclines), ou idiopathique.",
    diagnostique: "Échocardiographie : dilatation VG, fraction d'éjection abaissée (< 40 %). IRM cardiaque pour préciser l'étiologie. BNP/NT-proBNP élevés. Bilan génétique si forme familiale suspectée.",
    traitement: "IEC ou ARA2, bêtabloquants, antagonistes de l'aldostérone, diurétiques. Défibrillateur implantable si FE < 35 % malgré traitement optimal. Resynchronisation cardiaque si QRS élargis. Transplantation en dernier recours.",
  },
  {
    id: 5, letter: "C", title: "Cardiopathie ischémique", subtitle: "Coronaropathie",
    tags: ["Coronarographie", "Stent", "Angor"], icon: "💔",
    epidemiologie: "Première cause de mortalité mondiale. En France, environ 120 000 infarctus par an. Prévalence de l'angor stable estimée à 3–4 % de la population adulte, augmentant avec l'âge.",
    physiopathologie: "Réduction du flux sanguin coronaire par sténose athéromateuse fixe (angor stable) ou rupture de plaque avec thrombose (syndrome coronarien aigu). L'ischémie myocardique résulte du déséquilibre entre apports et besoins en oxygène.",
    diagnostique: "ECG (sus/sous-décalage ST), troponines (nécrose), test d'ischémie (épreuve d'effort, scintigraphie, IRM de stress), coronarographie pour confirmer et localiser les lésions.",
    traitement: "Angioplastie coronaire percutanée avec pose de stent en urgence pour les SCA. Pontage aorto-coronarien pour les lésions pluritronculaires complexes. Traitement médical : antiagrégants, statines, bêtabloquants, IEC.",
  },
  {
    id: 6, letter: "E", title: "Embolie pulmonaire", subtitle: "Urgence vasculaire",
    tags: ["Anticoagulants", "Héparine", "TEP"], icon: "🫁",
    epidemiologie: "Incidence de 60 à 70 cas pour 100 000 personnes par an en Europe. Troisième cause de mortalité cardiovasculaire après l'infarctus et l'AVC. Mortalité précoce de 5–10 % dans les formes à haut risque.",
    physiopathologie: "Obstruction d'une ou plusieurs artères pulmonaires par un thrombus, le plus souvent d'origine veineuse profonde des membres inférieurs (TVP). Entraîne une hypertension pulmonaire aiguë et une défaillance ventriculaire droite.",
    diagnostique: "Score de Wells pour évaluer la probabilité clinique. D-dimères si probabilité faible. Angio-scanner thoracique (gold standard). Échocardiographie pour évaluer le retentissement sur le VD.",
    traitement: "Anticoagulation immédiate par héparine puis relais par anticoagulants oraux (AOD en première intention). Thrombolyse systémique ou embolectomie chirurgicale en cas de choc ou d'arrêt cardiaque.",
  },
  {
    id: 7, letter: "E", title: "Endocardite infectieuse", subtitle: "Infection valvulaire",
    tags: ["Hémocultures", "Antibiotiques", "Chirurgie"], icon: "🦠",
    epidemiologie: "Incidence de 3 à 7 cas pour 100 000 personnes par an. Mortalité hospitalière de 15–25 %. Plus fréquente chez l'homme, le sujet âgé, les porteurs de prothèses valvulaires et les usagers de drogues intraveineuses.",
    physiopathologie: "Colonisation de l'endocarde par des micro-organismes (surtout streptocoques et staphylocoques) avec formation de végétations friables pouvant emboliser. Favorisée par des lésions valvulaires préexistantes ou des prothèses.",
    diagnostique: "Critères de Duke : hémocultures positives + imagerie (échocardiographie transthoracique et trans-oesophagienne, scanner, PET-scan). Au moins 3 paires d'hémocultures avant toute antibiothérapie.",
    traitement: "Antibiothérapie bactéricide prolongée (4–6 semaines) adaptée au germe. Chirurgie (remplacement valvulaire) indiquée en cas d'insuffisance cardiaque, d'abcès, de végétations volumineuses ou d'échec du traitement médical.",
  },
  {
    id: 8, letter: "F", title: "Fibrillation auriculaire", subtitle: "Arythmie fréquente",
    tags: ["FA", "Anticoagulation", "Cardioversion"], icon: "〰️",
    epidemiologie: "Arythmie cardiaque soutenue la plus fréquente : 1–2 % de la population générale, 10 % après 80 ans. Multiplie par 5 le risque d'AVC ischémique et par 2 la mortalité cardiovasculaire.",
    physiopathologie: "Activation électrique anarchique des oreillettes par multiples circuits de micro-réentrée, entraînant une contraction inefficace et une stase sanguine dans l'auricule gauche, source de thrombus et d'embolies.",
    diagnostique: "ECG : absence d'ondes P, rythme irrégulier, trémulation de la ligne isoélectrique. Holter si paroxystique. Échocardiographie pour rechercher une cardiopathie sous-jacente et évaluer la fonction VG.",
    traitement: "Anticoagulation au long cours (AOD ou AVK selon le score CHA₂DS₂-VASc). Contrôle de la fréquence (bêtabloquants, digoxine) ou du rythme (cardioversion, ablation par radiofréquence de l'ostium des veines pulmonaires).",
  },
  {
    id: 9, letter: "H", title: "Hypertension artérielle", subtitle: "Facteur de risque majeur",
    tags: ["HTA", "Antihypertenseurs", "MAPA"], icon: "📈",
    epidemiologie: "Touche environ 30 % des adultes dans le monde, soit plus d'un milliard de personnes. Principal facteur de risque modifiable d'AVC, d'infarctus, d'insuffisance cardiaque et d'insuffisance rénale chronique.",
    physiopathologie: "Élévation chronique des résistances vasculaires périphériques, souvent multifactorielle (génétique, surpoids, sédentarité, excès de sel, stress). Entraîne une hypertrophie ventriculaire gauche, une artériosclérose et une atteinte des organes cibles.",
    diagnostique: "Mesure répétée ≥ 140/90 mmHg au cabinet. MAPA ou automesure tensionnelle pour confirmer et éliminer l'effet blouse blanche. Bilan des atteintes d'organes cibles (ECG, fond d'œil, créatinine, microalbuminurie).",
    traitement: "Règles hygiéno-diététiques (réduction du sel, perte de poids, activité physique). Médicaments de première ligne : IEC ou ARA2, inhibiteurs calciques, diurétiques thiazidiques. Objectif tensionnel < 130/80 mmHg.",
  },
  {
    id: 10, letter: "I", title: "Insuffisance cardiaque", subtitle: "Syndrome complexe",
    tags: ["FE", "BNP", "Diurétiques"], icon: "💧",
    epidemiologie: "Affecte plus de 64 millions de personnes dans le monde. Prévalence de 1–2 % en Europe, atteignant 10 % chez les plus de 70 ans. Mortalité à 5 ans d'environ 50 %, comparable à de nombreux cancers.",
    physiopathologie: "Incapacité du cœur à assurer un débit adapté aux besoins métaboliques. Peut être systolique (FE abaissée) ou diastolique (FE préservée). Activation neuro-hormonale compensatrice (SRAA, système sympathique) aggrave progressivement la maladie.",
    diagnostique: "Clinique : dyspnée, œdèmes, orthopnée. BNP ou NT-proBNP élevés. Échocardiographie pour mesurer la FE et identifier la cause. Radiographie thoracique (cardiomégalie, épanchement pleural).",
    traitement: "Pour la FE abaissée : IEC/ARA2/ARNI, bêtabloquants, antagonistes de l'aldostérone, gliflozines. Diurétiques pour la congestion. Défibrillateur et resynchronisation selon les critères. Transplantation cardiaque en phase terminale.",
  },
  {
    id: 11, letter: "I", title: "Infarctus du myocarde", subtitle: "Occlusion coronaire aiguë",
    tags: ["IDM", "STEMI", "Angioplastie"], icon: "🚨",
    epidemiologie: "Environ 700 000 cas par an en Europe. Mortalité hospitalière réduite à < 5 % grâce aux filières de soins modernes, mais reste une cause majeure de décès prématurés et d'insuffisance cardiaque séquellaire.",
    physiopathologie: "Occlusion thrombotique aiguë d'une artère coronaire, le plus souvent par rupture d'une plaque d'athérome instable. La nécrose myocardique débute après 20 minutes d'ischémie totale et progresse de l'endocarde vers l'épicarde.",
    diagnostique: "Douleur thoracique typique + sus-décalage du segment ST (STEMI) ou sans sus-décalage (NSTEMI). Élévation de la troponine (hypersensible). Coronarographie en urgence pour confirmer et traiter l'occlusion.",
    traitement: "Angioplastie primaire dans les 90 minutes (STEMI) ou dans les 24–72h (NSTEMI à haut risque). Antiagrégants plaquettaires doubles (aspirine + inhibiteur P2Y12), anticoagulants, statines à haute dose, bêtabloquants, IEC.",
  },
  {
    id: 12, letter: "P", title: "Péricardite", subtitle: "Inflammation péricardique",
    tags: ["AINS", "Colchicine", "Frottement"], icon: "🔥",
    epidemiologie: "Représente 5 % des consultations aux urgences pour douleur thoracique non ischémique. Touche préférentiellement les adultes jeunes (20–50 ans). Risque de récidive de 15–30 % après un premier épisode.",
    physiopathologie: "Inflammation du péricarde, le plus souvent d'origine virale (entérovirus, CMV, EBV) ou idiopathique. Peut également être bactérienne, auto-immune (lupus, PR), néoplasique ou post-radique. L'inflammation peut entraîner un épanchement péricardique.",
    diagnostique: "Triade clinique : douleur thoracique positionnelle, frottement péricardique à l'auscultation, anomalies ECG diffuses (sus-décalage ST concave + sous-décalage PR). Échocardiographie pour détecter un épanchement.",
    traitement: "AINS (ibuprofène ou aspirine) + colchicine pendant 3 mois pour réduire les récidives. Repos sportif obligatoire. Corticoïdes en cas d'échec ou de cause spécifique. Drainage péricardique si tamponnade associée.",
  },
  {
    id: 13, letter: "S", title: "Sténose aortique", subtitle: "Valvulopathie",
    tags: ["TAVI", "Gradient", "Surface valvulaire"], icon: "🚪",
    epidemiologie: "Valvulopathie la plus fréquente dans les pays développés. Prévalence de 2–3 % après 65 ans, jusqu'à 10 % après 80 ans. Principale indication de remplacement valvulaire en Europe et en Amérique du Nord.",
    physiopathologie: "Calcification progressive des feuillets valvulaires aortiques entraînant une obstruction à l'éjection du ventricule gauche. Génère une hypertrophie concentrique VG compensatrice, puis une dysfonction et une dilatation à un stade avancé.",
    diagnostique: "Souffle systolique éjectif au foyer aortique irradiant dans les carotides. Échocardiographie Doppler : gradient moyen, surface valvulaire (sévère si < 1 cm²), FE. Cathétérisme si discordances.",
    traitement: "Remplacement valvulaire aortique chirurgical (RVAC) ou par voie percutanée (TAVI) en cas de sténose sévère symptomatique. Le TAVI est désormais indiqué à tous les âges selon le profil de risque chirurgical.",
  },
  {
    id: 14, letter: "T", title: "Tamponnade cardiaque", subtitle: "Urgence péricardique",
    tags: ["Péricardiocentèse", "Épanchement", "Beck"], icon: "⚠️",
    epidemiologie: "Urgence rare mais potentiellement fatale. Peut compliquer toute péricardite, un traumatisme thoracique, une dissection aortique, une néoplasie ou une procédure cardiaque invasive.",
    physiopathologie: "Accumulation rapide de liquide dans le péricarde comprimant les cavités cardiaques droites, puis gauches, réduisant le remplissage ventriculaire et le débit cardiaque. La vitesse d'accumulation est plus importante que le volume.",
    diagnostique: "Triade de Beck : hypotension, turgescence jugulaire, bruits du cœur assourdis. Pouls paradoxal (chute inspiratoire de la PA > 10 mmHg). Échocardiographie en urgence : épanchement + collapsus des cavités droites.",
    traitement: "Péricardiocentèse en urgence (guidée par échographie de préférence). Expansion volémique en attente du geste. Traitement de la cause sous-jacente. Fenêtre péricardique chirurgicale en cas de récidive ou d'hémopéricarde.",
  },
  {
    id: 15, letter: "T", title: "Tachycardie ventriculaire", subtitle: "Arythmie grave",
    tags: ["TV", "Défibrillateur", "Amiodarone"], icon: "⚡",
    epidemiologie: "La TV soutenue affecte principalement les patients avec cardiopathie ischémique séquellaire (cicatrice d'infarctus). Responsable d'une proportion importante des morts subites cardiaques, estimées à 300 000 cas/an en Europe.",
    physiopathologie: "Rythme cardiaque rapide (> 100 bpm) d'origine ventriculaire, souvent par mécanisme de réentrée autour d'une cicatrice myocardique. Peut dégénérer en fibrillation ventriculaire et arrêt cardiaque si non traitée rapidement.",
    diagnostique: "ECG : tachycardie à complexes larges (QRS > 120 ms), dissociation auriculo-ventriculaire, captures et fusions. Exploration électrophysiologique pour cartographier et guider l'ablation.",
    traitement: "TV bien tolérée : cardioversion électrique ou amiodarone IV. TV mal tolérée/FV : choc électrique externe immédiat. Au long cours : défibrillateur implantable (DAI) + amiodarone. Ablation par cathéter pour les TV récidivantes.",
  },
];

const ecgItems = [
  {
    id: 1, letter: "B", title: "Bloc de branche gauche", subtitle: "Trouble de conduction",
    icon: "↙️", tags: ["QRS > 120ms", "V5-V6", "Rsr'"],
    description: "Retard de dépolarisation du ventricule gauche. QRS ≥ 120 ms, aspect en plateau ou crocheté en V5-V6, onde S profonde en V1. Peut être idiopathique, ischémique ou hypertensif. Nécessite une évaluation cardiologique.",
  },
  {
    id: 2, letter: "B", title: "Bloc de branche droit", subtitle: "Trouble de conduction",
    icon: "↗️", tags: ["QRS > 120ms", "rSR' en V1", "onde S"],
    description: "Retard de dépolarisation du ventricule droit. Aspect rSR' en V1-V2, onde S large en DI et V6. Souvent bénin mais peut être associé à une embolie pulmonaire, une cardiopathie congénitale ou une myocardite.",
  },
  {
    id: 3, letter: "F", title: "Fibrillation ventriculaire", subtitle: "Urgence absolue",
    icon: "🌊", tags: ["Choc électrique", "RCP", "Défibrillation"],
    description: "Activité électrique ventriculaire chaotique sans contraction efficace. Aspect anarchique sans complexes identifiables. Cause principale d'arrêt cardiaque. Traitement immédiat : défibrillation + RCP.",
  },
  {
    id: 4, letter: "H", title: "Hyperkaliémie", subtitle: "Trouble électrolytique",
    icon: "⚗️", tags: ["Ondes T", "QRS large", "Kaliémie"],
    description: "Signes ECG progressifs : ondes T amples et pointues, allongement du PR, élargissement du QRS, aspect sinusoïdal. Urgence métabolique nécessitant une correction rapide de la kaliémie.",
  },
  {
    id: 5, letter: "I", title: "Ischémie sous-endocardique", subtitle: "Sus-décalage ST",
    icon: "📉", tags: ["Sus-ST", "STEMI", "Coronaire"],
    description: "Sus-décalage du segment ST dans un territoire coronaire (antérieur, inférieur, latéral). Signe d'occlusion coronaire aiguë jusqu'à preuve du contraire. Urgence : coronarographie en moins de 90 minutes.",
  },
  {
    id: 6, letter: "Q", title: "QT long", subtitle: "Trouble de repolarisation",
    icon: "⏱️", tags: ["QTc", "Torsades", "Médicaments"],
    description: "Allongement de l'intervalle QT corrigé (QTc > 450 ms chez l'homme, > 460 ms chez la femme). Risque de torsades de pointes et de mort subite. Causes : médicaments, hypokaliémie, syndrome congénital.",
  },
  {
    id: 7, letter: "R", title: "Rythme sinusal normal", subtitle: "ECG de référence",
    icon: "✅", tags: ["60-100 bpm", "Onde P", "PR normal"],
    description: "Fréquence entre 60 et 100 bpm, onde P positive en DII précédant chaque QRS, intervalle PR entre 120 et 200 ms, QRS fins (< 120 ms), repolarisation normale. Référence pour toute interprétation ECG.",
  },
  {
    id: 8, letter: "T", title: "Tachycardie sinusale", subtitle: "Arythmie fréquente",
    icon: "💨", tags: ["> 100 bpm", "Onde P", "Fièvre"],
    description: "Fréquence cardiaque > 100 bpm avec rythme sinusal régulier. Causes : fièvre, douleur, anxiété, anémie, hyperthyroïdie, embolie pulmonaire. Traitement de la cause sous-jacente.",
  },
];

const medicaments = [
  {
    id: 1, letter: "A", title: "Amiodarone", subtitle: "Antiarythmique classe III",
    icon: "💊", tags: ["Cordarone", "FA", "TV"],
    indication: "Fibrillation auriculaire, tachycardie ventriculaire, flutter auriculaire. Traitement de référence des arythmies graves en présence d'une cardiopathie sous-jacente.",
    mecanisme: "Bloque les canaux potassiques (classe III), sodiques et calciques. Effet bêtabloquant partiel. Allonge la durée du potentiel d'action et de la période réfractaire dans tous les tissus cardiaques.",
    posologie: "Charge : 200 mg × 3/j pendant 8–10 jours, puis 200 mg × 2/j pendant 8–10 jours. Entretien : 200 mg/j (5j/7). IV : 300 mg en bolus lent en cas d'urgence.",
    effetsIndesirables: "Dysthyroïdie (hypo ou hyperthyroïdie), pneumopathie interstitielle, hépatotoxicité, neuropathie périphérique, photosensibilité, dépôts cornéens. Bilan thyroïdien, hépatique et pulmonaire régulier indispensable.",
  },
  {
    id: 2, letter: "A", title: "Aspirine", subtitle: "Antiagrégant plaquettaire",
    icon: "🔴", tags: ["Kardégic", "IDM", "AVC"],
    indication: "Prévention secondaire après infarctus du myocarde, AVC ischémique, angioplastie coronaire. Associée à un inhibiteur P2Y12 (double antiagrégation) après un SCA ou la pose d'un stent.",
    mecanisme: "Inhibition irréversible de la cyclo-oxygénase (COX-1 et COX-2), bloquant la synthèse du thromboxane A2 et réduisant l'agrégation plaquettaire. L'effet dure toute la vie de la plaquette (7–10 jours).",
    posologie: "75 à 100 mg/j en prévention secondaire. 250–500 mg IV ou 300 mg oral en phase aiguë d'infarctus. Associée au ticagrélor ou au clopidogrel après SCA.",
    effetsIndesirables: "Ulcères gastro-duodénaux, hémorragies digestives, allergie (rare). Protection gastrique par IPP si risque digestif élevé. Contre-indiquée en cas d'allergie aux AINS ou d'ulcère actif.",
  },
  {
    id: 3, letter: "B", title: "Bêtabloquants", subtitle: "Antihypertenseur / Antiarythmique",
    icon: "🛡️", tags: ["Bisoprolol", "HTA", "IC"],
    indication: "Insuffisance cardiaque à FE abaissée (bisoprolol, carvédilol, métoprolol), HTA, angor stable, post-infarctus, fibrillation auriculaire (contrôle de fréquence), tachycardie sinusale.",
    mecanisme: "Blocage compétitif des récepteurs bêta-adrénergiques. Réduction de la fréquence cardiaque, de la contractilité et de la pression artérielle. Effet antiarythmique par allongement de la période réfractaire nodale.",
    posologie: "Bisoprolol : débuter à 1,25 mg/j, doubler toutes les 2 semaines jusqu'à 10 mg/j. Métoprolol LP : 25–200 mg/j. Carvédilol : 3,125–25 mg × 2/j. Toujours introduire à faible dose et titrer progressivement.",
    effetsIndesirables: "Bradycardie, hypotension, fatigue, froideur des extrémités, bronchospasme (contre-indiqué en cas d'asthme). Dysfonction érectile. Ne jamais arrêter brutalement (risque de rebond).",
  },
  {
    id: 4, letter: "D", title: "Digoxine", subtitle: "Cardiotonique",
    icon: "🌿", tags: ["Digoxine", "FA", "IC"],
    indication: "Contrôle de la fréquence ventriculaire dans la fibrillation auriculaire, insuffisance cardiaque à FE abaissée en cas d'échec des autres traitements. Usage en diminution en raison de sa fenêtre thérapeutique étroite.",
    mecanisme: "Inhibition de la Na+/K+-ATPase augmentant le calcium intracellulaire (effet inotrope positif). Effet vagomimétique ralentissant la conduction nodale (effet chronotrope et dromotrope négatif).",
    posologie: "0,125 à 0,25 mg/j par voie orale. Adapter à la fonction rénale (risque d'accumulation). Dosage sérique cible : 0,6–1,2 ng/mL. Surveillance ECG et kaliémie indispensables.",
    effetsIndesirables: "Toxicité digitale : nausées, troubles visuels (vision jaune), bradycardie, blocs AV, arythmies ventriculaires. Aggravée par l'hypokaliémie. Antidote : anticorps anti-digoxine (Digidot).",
  },
  {
    id: 5, letter: "F", title: "Furosémide", subtitle: "Diurétique de l'anse",
    icon: "💧", tags: ["Lasilix", "IC", "Œdèmes"],
    indication: "Insuffisance cardiaque aiguë et chronique (décongestion), HTA résistante, syndrome néphrotique, cirrhose ascitique. Diurétique de référence dans l'insuffisance cardiaque.",
    mecanisme: "Inhibition du cotransporteur Na-K-2Cl dans la branche ascendante de l'anse de Henlé. Puissant effet diurétique et natriurétique. Également vasodilatateur veineux à action rapide par voie IV.",
    posologie: "Oral : 20–500 mg/j selon la sévérité. IV : 20–80 mg en bolus, perfusion continue possible. Adapter la dose à la diurèse (objectif : perte de 500–1000 mL/j en décompensation). Surveiller kaliémie et créatinine.",
    effetsIndesirables: "Hypokaliémie (supplémentation potassique souvent nécessaire), hyponatrémie, déshydratation, hypotension, ototoxicité à forte dose IV. Hyperuricémie. Hypovolémie si diurèse excessive.",
  },
  {
    id: 6, letter: "H", title: "Héparine non fractionnée", subtitle: "Anticoagulant",
    icon: "🩺", tags: ["HNF", "SCA", "EP"],
    indication: "Traitement initial des syndromes coronariens aigus, embolie pulmonaire massive, thrombose veineuse profonde. Anticoagulation peropératoire lors des procédures de circulation extracorporelle.",
    mecanisme: "Potentialise l'action de l'antithrombine III, inhibant les facteurs Xa et IIa (thrombine). Effet anticoagulant immédiat. Antidote disponible : sulfate de protamine.",
    posologie: "Bolus IV : 60–80 UI/kg, puis perfusion continue de 12–18 UI/kg/h. Adapter pour obtenir un TCA cible de 60–100 secondes (2–3 fois le témoin). Surveillance TCA toutes les 6h initialement.",
    effetsIndesirables: "Hémorragies, thrombocytopénie induite par l'héparine (TIH) — surveiller la NFS, ostéoporose au long cours. Allergie possible. Antidote : protamine (1 mg pour 100 UI d'HNF).",
  },
  {
    id: 7, letter: "I", title: "Ivabradine", subtitle: "Bradycardisant",
    icon: "🎯", tags: ["Procoralan", "IC", "Angor"],
    indication: "Insuffisance cardiaque à FE abaissée (≤ 35 %) en rythme sinusal avec FC ≥ 70 bpm malgré bêtabloquants à dose maximale tolérée. Angor stable en cas d'intolérance aux bêtabloquants.",
    mecanisme: "Inhibition sélective du courant If (funny current) dans le nœud sinusal, réduisant la fréquence cardiaque sans effet inotrope négatif ni effet sur la pression artérielle.",
    posologie: "5 mg × 2/j au cours des repas, augmentation possible à 7,5 mg × 2/j après 2 semaines si FC > 60 bpm. Réduire à 2,5 mg × 2/j si FC < 50 bpm ou symptômes de bradycardie.",
    effetsIndesirables: "Phosphènes (sensation lumineuse), bradycardie, allongement du QT. Contre-indiqué en FA (absence d'effet), en cas de BAV 2° et 3°, de bradycardie < 60 bpm. Interactions avec inhibiteurs du CYP3A4.",
  },
  {
    id: 8, letter: "S", title: "Statines", subtitle: "Hypolipémiant",
    icon: "⚕️", tags: ["Atorvastatine", "LDL", "Prévention"],
    indication: "Prévention primaire et secondaire des événements cardiovasculaires. Traitement de l'hypercholestérolémie. Objectif LDL < 0,55 g/L en prévention secondaire (très haut risque cardiovasculaire).",
    mecanisme: "Inhibition compétitive de la HMG-CoA réductase, enzyme clé de la synthèse hépatique du cholestérol. Réduction du LDL de 30 à 55 % selon la molécule et la dose. Effets pléiotropes anti-inflammatoires.",
    posologie: "Atorvastatine 40–80 mg/j ou rosuvastatine 20–40 mg/j en prévention secondaire (haute intensité). Prendre le soir de préférence. Surveiller CPK et transaminases en début de traitement.",
    effetsIndesirables: "Myalgies, myopathie, rhabdomyolyse (rare), élévation des transaminases. Risque de diabète de type 2 légèrement augmenté. Interactions avec certains médicaments (fibrates, ciclosporine).",
  },
];

const ACCENT = "#C0392B";
const CLINICAL_SECTIONS = [
  { key: "epidemiologie", label: "Épidémiologie" },
  { key: "physiopathologie", label: "Physiopathologie" },
  { key: "diagnostique", label: "Diagnostique" },
  { key: "traitement", label: "Traitement" },
];
const DRUG_SECTIONS = [
  { key: "indication", label: "Indication" },
  { key: "mecanisme", label: "Mécanisme" },
  { key: "posologie", label: "Posologie" },
  { key: "effetsIndesirables", label: "Effets indésirables" },
];

const NAV_TABS = [
  { key: "pathologies", label: "Pathologies", icon: "🫀" },
  { key: "ecg", label: "ECG", icon: "📈" },
  { key: "medicaments", label: "Médicaments", icon: "💊" },
  { key: "local", label: "Chalon", icon: "🏥" },
];

export default function CardiologyApp() {
  const [mainTab, setMainTab] = useState("pathologies");
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [activeSection, setActiveSection] = useState("epidemiologie");
  const [images, setImages] = useState({});

  // Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [logoTaps, setLogoTaps] = useState(0);

  // ECG images
  const [ecgImages, setEcgImages] = useState({});
  const [uploadingEcg, setUploadingEcg] = useState(false);

  // Supabase medicaments
  const [dbMedicaments, setDbMedicaments] = useState([]);
  // Supabase pathologies
  const [dbPathologies, setDbPathologies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchMedicaments();
    fetchPathologies();
  }, []);

  const parseTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    try { const parsed = JSON.parse(tags); if (Array.isArray(parsed)) return parsed; } catch {}
    return tags.split(",").map(t => t.trim()).filter(Boolean);
  };

  const fetchMedicaments = async () => {
    const { data } = await supabase.from("medicaments").select("*").order("title");
    if (data && data.length > 0) {
      setDbMedicaments(data.map(item => ({ ...item, tags: parseTags(item.tags) })));
    }
  };

  const fetchPathologies = async () => {
    const { data } = await supabase.from("pathologies").select("*").order("title");
    if (data && data.length > 0) {
      setDbPathologies(data.map(item => ({ ...item, tags: parseTags(item.tags) })));
    }
  };

  const activeMedicaments = dbMedicaments.length > 0 ? dbMedicaments : medicaments;
  const activePathologies = dbPathologies.length > 0 ? dbPathologies : cardiologyTopics;

  const handleLogoTap = () => {
    const newCount = logoTaps + 1;
    setLogoTaps(newCount);
    if (newCount >= 3) { setShowAdminLogin(true); setLogoTaps(0); }
    setTimeout(() => setLogoTaps(0), 2000);
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true); setShowAdminLogin(false); setAdminPassword(""); setAdminError("");
    } else {
      setAdminError("Mot de passe incorrect");
    }
  };

  const fetchEcgImages = async (ecgId) => {
    const { data } = await supabase.storage.from("ecg-images").list(`ecg-${ecgId}/`);
    if (data && data.length > 0) {
      const urls = data.map((file) => ({
        name: file.name,
        url: supabase.storage.from("ecg-images").getPublicUrl(`ecg-${ecgId}/${file.name}`).data.publicUrl,
      }));
      setEcgImages((prev) => ({ ...prev, [ecgId]: urls }));
    }
  };

  const handleEcgUpload = async (ecgId, e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingEcg(true);
    for (const file of files) {
      const filename = `${Date.now()}-${file.name}`;
      await supabase.storage.from("ecg-images").upload(`ecg-${ecgId}/${filename}`, file);
    }
    await fetchEcgImages(ecgId);
    setUploadingEcg(false);
  };

  const handleEcgDeleteImage = async (ecgId, filename) => {
    await supabase.storage.from("ecg-images").remove([`ecg-${ecgId}/${filename}`]);
    setEcgImages((prev) => ({
      ...prev,
      [ecgId]: (prev[ecgId] || []).filter((img) => img.name !== filename),
    }));
  };
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("- ") || line.startsWith("• ")) {
        const content = line.replace(/^[-•]\s/, "");
        const parts = content.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
            <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>•</span>
            <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</span>
          </div>
        );
      }
      if (line === "") return <div key={i} style={{ height: 8 }} />;
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <div key={i} style={{ marginBottom: 4 }}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        </div>
      );
    });
  };

  const handleEdit = (item) => {
    setEditData({ ...item });
    setEditMode(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const table = mainTab === "medicaments" ? "medicaments" : "pathologies";
    const { id, ...fields } = editData;
    if (id && typeof id === "number") {
      await supabase.from(table).update(fields).eq("id", id);
    } else {
      await supabase.from(table).insert([fields]);
    }
    if (table === "medicaments") await fetchMedicaments();
    else await fetchPathologies();
    setSaving(false);
    setSaveSuccess(true);
    setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleImageUpload = (id, e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => ({
          ...prev,
          [id]: [...(prev[id] || []), { url: ev.target.result, caption: file.name }],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (id, index) => {
    setImages((prev) => {
      const updated = [...(prev[id] || [])];
      updated.splice(index, 1);
      return { ...prev, [id]: updated };
    });
  };

  const currentData = mainTab === "pathologies" ? activePathologies : mainTab === "ecg" ? ecgItems : activeMedicaments;
  const sections = mainTab === "medicaments" ? DRUG_SECTIONS : CLINICAL_SECTIONS;
  const defaultSection = mainTab === "medicaments" ? "indication" : "epidemiologie";

  const alphabet = [...new Set(currentData.map((t) => t.letter))].sort();

  const filtered = useMemo(() => {
    return currentData.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchLetter = activeLetter ? t.letter === activeLetter : true;
      return matchSearch && matchLetter;
    });
  }, [search, activeLetter, currentData]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((t) => {
      if (!groups[t.letter]) groups[t.letter] = [];
      groups[t.letter].push(t);
    });
    return groups;
  }, [filtered]);

  const selectedItem = activeCard ? currentData.find((t) => t.id === activeCard) : null;

  const openDetail = (id) => {
    setActiveCard(id);
    setActiveSection(defaultSection);
    if (mainTab === "ecg") fetchEcgImages(id);
  };

  const switchTab = (tab) => {
    setMainTab(tab);
    setSearch("");
    setActiveLetter(null);
    setActiveCard(null);
  };

  const getDetailContent = (item, section) => {
    if (item[section]) return item[section];
    if (section === "epidemiologie" && item.description) return item.description;
    return "Contenu à venir.";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4F0", fontFamily: "'Georgia', serif", color: "#1A1A1A", paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .search-input {
          background: #F7F4F0;
          border: 1px solid #DDD5CC;
          border-radius: 6px;
          color: #1A1A1A;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 10px 16px 10px 36px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input::placeholder { color: #B0A89E; }
        .search-input:focus { border-color: ${ACCENT}; background: #fff; }

        .letter-btn {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          padding: 6px 12px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
          color: #A09080;
        }
        .letter-btn:hover { color: ${ACCENT}; border-color: #EADDD5; background: #FDF5F3; }
        .letter-btn.active { color: ${ACCENT}; border-color: ${ACCENT}60; background: #FDF0EE; }

        .topic-card {
          background: #FFFFFF;
          border: 1px solid #EDE6DF;
          border-radius: 8px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .topic-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.2s;
          border-radius: 8px 0 0 8px;
        }
        .topic-card:hover { border-color: #DDD0C8; box-shadow: 0 2px 12px rgba(0,0,0,0.07); transform: translateY(-1px); }
        .topic-card:hover::before { background: ${ACCENT}; }
        .topic-card.selected { border-color: ${ACCENT}50; }
        .topic-card.selected::before { background: ${ACCENT}; }

        .letter-group-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: ${ACCENT};
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
          user-select: none;
          border-left: 4px solid ${ACCENT};
          padding-left: 12px;
        }

        .tag-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          padding: 3px 9px;
          background: #F2EDE8;
          border-radius: 3px;
          color: #8C7B6E;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .section-tab {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid #EDE6DF;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s;
          color: #A09080;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .section-tab:hover { border-color: #DDD0C8; color: #5A4A40; }
        .section-tab.active { background: #FDF0EE; border-color: ${ACCENT}50; color: ${ACCENT}; }

        .upload-zone {
          display: block;
          border: 2px dashed #DDD5CC;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #FDFAF8;
        }
        .upload-zone:hover { border-color: ${ACCENT}60; background: #FDF5F3; }
        .upload-zone input { display: none; }
        .img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 12px; }
        .img-item { position: relative; border-radius: 6px; overflow: hidden; border: 1px solid #EDE6DF; }
        .img-item img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .img-delete {
          position: absolute; top: 6px; right: 6px;
          background: rgba(255,255,255,0.92); border: 1px solid #EDE6DF;
          border-radius: 3px; width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px; color: #A09080; transition: all 0.15s;
        }
        .img-delete:hover { background: #FDF0EE; color: ${ACCENT}; border-color: ${ACCENT}50; }
        .img-caption { padding: 5px 8px; font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #A09080; background: #FDFAF8; letter-spacing: 0.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .bottom-nav {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #FFFFFF;
          border-top: 1px solid #EDE6DF;
          display: flex;
          z-index: 40;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
        }
        .nav-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 0 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          gap: 4px;
        }
        .nav-btn.active { background: #FDF5F3; }
        .nav-btn-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #B0A090;
          transition: color 0.15s;
        }
        .nav-btn.active .nav-btn-label { color: ${ACCENT}; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #DDD5CC; border-radius: 2px; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E0D8", padding: "32px 24px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#B08070", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              v1.0 — Référentiel clinique
            </span>
          </div>
          <h1 onClick={handleLogoTap} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 8, color: "#1A1A1A", cursor: "default", userSelect: "none" }}>
            Cardiologie
            <span style={{ color: ACCENT, fontStyle: "italic" }}> Clinique</span>
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#A09080", fontStyle: "italic", marginBottom: 20 }}>
            {mainTab === "pathologies" && "Pathologies cardiovasculaires — classification alphabétique"}
            {mainTab === "ecg" && "Interprétation ECG — classification alphabétique"}
            {mainTab === "medicaments" && "Médicaments cardiovasculaires — classification alphabétique"}
            {mainTab === "local" && "Ressources locales — Chalon-sur-Saône"}
          </p>
          {mainTab !== "local" && (
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#C0A090", fontSize: 14 }}>⌕</span>
            <input
              className="search-input"
              placeholder={`Rechercher dans ${mainTab === "pathologies" ? "les pathologies" : mainTab === "ecg" ? "les ECG" : "les médicaments"}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          )}
        </div>
      </div>

      {/* ALPHABET NAV */}
      {mainTab !== "local" && (
      <div style={{ borderBottom: "1px solid #EDE6DF", padding: "10px 24px", background: "#FDFAF8", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 4, minWidth: "max-content" }}>
          <button className={`letter-btn ${!activeLetter ? "active" : ""}`} onClick={() => setActiveLetter(null)}>Tous</button>
          {alphabet.map((l) => (
            <button key={l} className={`letter-btn ${activeLetter === l ? "active" : ""}`} onClick={() => setActiveLetter(activeLetter === l ? null : l)}>
              {l}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* CONTENT */}
      {mainTab !== "local" && (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#C0B0A0", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic" }}>
            Aucun résultat trouvé
          </div>
        ) : (
          Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([letter, items]) => (
            <div key={letter} style={{ marginBottom: 48 }}>
              <div className="letter-group-heading">{letter}</div>
              <div style={{ display: "grid", gap: 12 }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`topic-card ${activeCard === item.id ? "selected" : ""}`}
                    onClick={() => openDetail(item.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1A1A1A" }}>{item.title}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B0A090", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{item.subtitle}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {item.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      )}

      {/* FULL PAGE DETAIL */}
      {selectedItem && (
        <div style={{ position: "fixed", inset: 0, background: "#F7F4F0", zIndex: 50, overflowY: "auto", animation: "slideInPage 0.25s ease" }}>
          <style>{`@keyframes slideInPage { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

          <div style={{ position: "sticky", top: 0, background: "#FFFFFF", borderBottom: "1px solid #EDE6DF", zIndex: 10, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setActiveCard(null)} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer", color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.06em", padding: "6px 0" }}>
              ← Retour
            </button>
            <div style={{ height: 16, width: 1, background: "#EDE6DF" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#1A1A1A", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {selectedItem.title}
            </span>
            <span style={{ fontSize: 22 }}>{selectedItem.icon}</span>
            {isAdmin && (mainTab === "medicaments" || mainTab === "pathologies") && (
              <button onClick={() => handleEdit(selectedItem)} style={{ background: ACCENT, border: "none", borderRadius: 4, color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "6px 12px", cursor: "pointer", letterSpacing: "0.06em" }}>
                ✏️ Modifier
              </button>
            )}
          </div>

          <div style={{ background: "#FFFFFF", padding: "28px 24px 24px", borderBottom: "1px solid #EDE6DF" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B08070", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
              {selectedItem.subtitle}
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#1A1A1A", marginBottom: 16 }}>
              {selectedItem.title}
            </h1>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {selectedItem.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "4px 12px", background: "#FDF0EE", border: `1px solid ${ACCENT}30`, borderRadius: 3, color: ACCENT }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: "#FDFAF8", borderBottom: "1px solid #EDE6DF", padding: "12px 24px", display: "flex", gap: 8, overflowX: "auto" }}>
            {sections.map((s) => (
              <button key={s.key} className={`section-tab ${activeSection === s.key ? "active" : ""}`} onClick={() => setActiveSection(s.key)} style={{ flexShrink: 0 }}>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: ACCENT, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
              {sections.find((s) => s.key === activeSection)?.label}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: "#2A1A10", lineHeight: 1.9 }}>
              {renderMarkdown(getDetailContent(selectedItem, activeSection))}
            </div>

            {images[`${mainTab}-${selectedItem.id}`]?.length > 0 && (
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #EDE6DF" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B0A090", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                  Images
                </div>
                <div className="img-grid">
                  {images[`${mainTab}-${selectedItem.id}`].map((img, i) => (
                    <div key={i} className="img-item">
                      <img src={img.url} alt={img.caption} style={{ height: 160 }} />
                      <div className="img-caption">{img.caption}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ECG IMAGES SECTION */}
            {mainTab === "ecg" && (
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #EDE6DF" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B0A090", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                  Tracés ECG — {ecgImages[selectedItem.id]?.length || 0} image{(ecgImages[selectedItem.id]?.length || 0) !== 1 ? "s" : ""}
                </div>

                {/* Images grid */}
                {ecgImages[selectedItem.id]?.length > 0 && (
                  <div className="img-grid" style={{ marginBottom: 16 }}>
                    {ecgImages[selectedItem.id].map((img, i) => (
                      <div key={i} className="img-item" style={{ cursor: "pointer" }} onClick={() => window.open(img.url, "_blank")}>
                        <img src={img.url} alt={img.name} style={{ height: 180, objectFit: "contain", background: "#FFF" }} />
                        {isAdmin && (
                          <button className="img-delete" onClick={(e) => { e.stopPropagation(); handleEcgDeleteImage(selectedItem.id, img.name); }}>×</button>
                        )}
                        <div className="img-caption">{img.name}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload zone — admin only */}
                {isAdmin && (
                  <label className="upload-zone">
                    <input type="file" accept="image/*" multiple onChange={(e) => handleEcgUpload(selectedItem.id, e)} />
                    {uploadingEcg ? (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT }}>Upload en cours...</div>
                    ) : (
                      <>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#8C7B6E", fontStyle: "italic" }}>Ajouter un tracé ECG</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#C0B0A0", marginTop: 4 }}>Photo · Scan · Capture</div>
                      </>
                    )}
                  </label>
                )}

                {!isAdmin && !ecgImages[selectedItem.id]?.length && (
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#C0B0A0", fontStyle: "italic" }}>
                    Aucun tracé disponible pour le moment.
                  </p>
                )}
              </div>
            )}

            <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #EDE6DF" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#C0B0A0", fontStyle: "italic" }}>
                Application à vocation éducative — Toujours se référer aux recommandations de la Société Européenne de Cardiologie (ESC).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LOCAL SECTION */}
      {mainTab === "local" && !activeCard && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B08070", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
              Cardiologie
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#1A1A1A", marginBottom: 4 }}>
              Chalon-sur-Saône
            </h2>
            <div style={{ height: 2, width: 40, background: ACCENT, marginTop: 12 }} />
          </div>

          {[
            {
              key: "annuaire",
              icon: "📋",
              title: "Annuaire",
              description: "Coordonnées des cardiologues, secrétariats et services de cardiologie du bassin chalonnais.",
            },
            {
              key: "reglement",
              icon: "📜",
              title: "Règlement",
              description: "Protocoles, règles de fonctionnement et procédures internes du service de cardiologie.",
            },
            {
              key: "prescription",
              icon: "✍️",
              title: "Aide à la prescription",
              description: "Fiches pratiques, ordonnances-types et guides de prescription locale.",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="topic-card"
              style={{ marginBottom: 16 }}
              onClick={() => setActiveCard(item.key)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A" }}>{item.title}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#8C7B6E", fontStyle: "italic", marginTop: 4 }}>{item.description}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "#C0B0A0", fontSize: 20 }}>›</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOCAL DETAIL PAGE */}
      {mainTab === "local" && activeCard && (
        <div style={{ position: "fixed", inset: 0, background: "#F7F4F0", zIndex: 50, overflowY: "auto", animation: "slideInPage 0.25s ease" }}>
          <style>{`@keyframes slideInPage2 { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

          {/* Top bar */}
          <div style={{ position: "sticky", top: 0, background: "#FFFFFF", borderBottom: "1px solid #EDE6DF", zIndex: 10, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setActiveCard(null)} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer", color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.06em", padding: "6px 0" }}>
              ← Retour
            </button>
            <div style={{ height: 16, width: 1, background: "#EDE6DF" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#1A1A1A" }}>
              {activeCard === "annuaire" ? "Annuaire" : activeCard === "reglement" ? "Règlement" : "Aide à la prescription"}
            </span>
          </div>

          {/* Annuaire content */}
          {activeCard === "annuaire" && (
            <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
              {[
                { icon: "🩺", title: "Médecin", description: "Liste des médecins référents et correspondants du service.", content: [
                  { nom: "Dr BUTTARD Patrick", tel: "22 11 01" },
                  { nom: "Dr BILLOD Calixte", tel: "22 11 45" },
                  { nom: "Dr CHATAR", tel: "22 11 44" },
                  { nom: "Dr CHENNA Yacine", tel: "22 11 04" },
                  { nom: "Dr DOISE Jean-Marc", tel: "22 02 85" },
                  { nom: "Dr EMSELLEM Philippe", tel: "22 11 39" },
                  { nom: "Dr FAYARD Maxime", tel: "22 11 05" },
                  { nom: "Dr HAMBLIN Joëlle", tel: "22 11 15" },
                  { nom: "Dr MIRABET", tel: "22 11 42" },
                  { nom: "Dr NGUYEN", tel: "22 02 55" },
                  { nom: "Dr PHILIP", tel: "22 03 14" },
                  { nom: "Dr VENET", tel: "22 11 33" },
                  { nom: "Dr YOU", tel: "22 02 54" },
                ]},
                { icon: "🫀", title: "Cardiologie", description: "Équipe médicale et paramédicale du service de cardiologie." },
                { icon: "🚨", title: "USIC", description: "Unité de Soins Intensifs de Cardiologie — contacts et organisation." },
                { icon: "📞", title: "Avis", description: "Demandes d'avis cardiologiques et procédures de consultation." },
              ].map((sub) => (
                <div key={sub.title} className="topic-card" style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 28 }}>{sub.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A" }}>{sub.title}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#8C7B6E", fontStyle: "italic", marginTop: 4 }}>{sub.description}</div>
                    </div>
                    <span style={{ marginLeft: "auto", color: "#C0B0A0", fontSize: 20 }}>›</span>
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #EDE6DF" }}>
                    {sub.content ? (
                      <div>
                        {sub.content.map((item, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < sub.content.length - 1 ? "1px solid #F2EDE8" : "none" }}>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#1A1A1A" }}>{item.nom}</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: ACCENT, letterSpacing: "0.05em", fontWeight: 700 }}>{item.tel}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#A09080", fontStyle: "italic" }}>
                        Contenu à venir — à compléter.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Règlement / Prescription content */}
          {(activeCard === "reglement" || activeCard === "prescription") && (
            <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#8C7B6E", fontStyle: "italic", textAlign: "center", marginTop: 60 }}>
                Contenu à venir — cette section sera complétée prochainement.
              </p>
            </div>
          )}
        </div>
      )}

      {/* BOUTON NOUVEAU MÉDICAMENT (admin only) */}
      {isAdmin && mainTab === "medicaments" && !activeCard && (
        <div style={{ position: "fixed", bottom: 90, right: 20, zIndex: 50 }}>
          <button
            onClick={() => {
              setEditData({ title: "", subtitle: "", icon: "💊", letter: "", tags: "", indication: "", mecanisme: "", posologie: "", effetsIndesirables: "" });
              setEditMode(true);
            }}
            style={{ background: ACCENT, border: "none", borderRadius: "50px", color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, padding: "14px 20px", cursor: "pointer", boxShadow: "0 4px 20px rgba(192,57,43,0.4)", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontSize: 18 }}>+</span> Nouveau médicament
          </button>
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        {NAV_TABS.map((tab) => (
          <button key={tab.key} className={`nav-btn ${mainTab === tab.key ? "active" : ""}`} onClick={() => switchTab(tab.key)}>
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span className="nav-btn-label">{tab.label}</span>
            {mainTab === tab.key && <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 24, height: 3, background: ACCENT, borderRadius: "2px 2px 0 0" }} />}
          </button>
        ))}
      </div>
      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#FFF", borderRadius: 12, padding: 32, width: "100%", maxWidth: 360, border: "1px solid #EDE6DF", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginBottom: 4 }}>Espace Admin</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B08070", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>Accès restreint</div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
              style={{ width: "100%", padding: "10px 14px", border: `1px solid ${adminError ? ACCENT : "#DDD5CC"}`, borderRadius: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: "none", marginBottom: 8, background: "#F7F4F0" }}
            />
            {adminError && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: ACCENT, marginBottom: 12 }}>{adminError}</div>}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button onClick={() => { setShowAdminLogin(false); setAdminPassword(""); setAdminError(""); }} style={{ flex: 1, padding: "10px", background: "#F7F4F0", border: "1px solid #DDD5CC", borderRadius: 6, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8C7B6E" }}>
                Annuler
              </button>
              <button onClick={handleAdminLogin} style={{ flex: 1, padding: "10px", background: ACCENT, border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#fff", letterSpacing: "0.06em" }}>
                Connexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editMode && editData && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto" }}>
          <div style={{ background: "#FFF", borderRadius: 12, padding: 32, width: "100%", maxWidth: 560, border: "1px solid #EDE6DF", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#1A1A1A", marginBottom: 4 }}>
              {editData.id ? "✏️ Modifier" : "➕ Nouveau médicament"}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#B08070", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>{editData.title || "Nouveau"}</div>

            {/* Champs de base si nouveau médicament */}
            {!editData.id && (
              <div>
                {[
                  { key: "title", label: "Nom du médicament" },
                  { key: "subtitle", label: "Classe thérapeutique" },
                  { key: "icon", label: "Icône (emoji)" },
                  { key: "letter", label: "Lettre (ex: A)" },
                  { key: "tags", label: "Tags (séparés par des virgules)" },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{field.label}</div>
                    <input
                      value={editData[field.key] || ""}
                      onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #DDD5CC", borderRadius: 6, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, outline: "none", background: "#F7F4F0" }}
                    />
                  </div>
                ))}
                <div style={{ height: 1, background: "#EDE6DF", margin: "20px 0" }} />
              </div>
            )}

            {/* Champs cliniques */}
            {(mainTab === "medicaments" ? DRUG_SECTIONS : CLINICAL_SECTIONS).map((field) => (
              <div key={field.key} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{field.label}</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  {[
                    { label: "• Liste", insert: (v, ss, ee) => { const before = v.substring(0, ss); const after = v.substring(ee); const sel = v.substring(ss, ee); return before + "\n- " + (sel || "") + after; } },
                    { label: "**Gras**", insert: (v, ss, ee) => { const before = v.substring(0, ss); const after = v.substring(ee); const sel = v.substring(ss, ee); return before + "**" + (sel || "texte") + "**" + after; } },
                    { label: "↵ Saut", insert: (v, ss, ee) => { const before = v.substring(0, ss); const after = v.substring(ee); return before + "\n" + after; } },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`textarea-${field.key}`);
                        if (!el) return;
                        const s = el.selectionStart;
                        const e = el.selectionEnd;
                        const newVal = btn.insert(editData[field.key] || "", s, e);
                        setEditData({ ...editData, [field.key]: newVal });
                        setTimeout(() => { el.focus(); el.setSelectionRange(s + 4, s + 4); }, 0);
                      }}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "4px 10px", background: "#F2EDE8", border: "1px solid #DDD5CC", borderRadius: 3, cursor: "pointer", color: "#6A5A50", letterSpacing: "0.04em" }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                <textarea
                  id={`textarea-${field.key}`}
                  value={editData[field.key] || ""}
                  onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                  rows={5}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #DDD5CC", borderRadius: 6, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, outline: "none", background: "#F7F4F0", resize: "vertical", lineHeight: 1.7 }}
                />
              </div>
            ))}

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => setEditMode(false)} style={{ flex: 1, padding: "12px", background: "#F7F4F0", border: "1px solid #DDD5CC", borderRadius: 6, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8C7B6E" }}>
                Annuler
              </button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: "12px", background: ACCENT, border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#fff", letterSpacing: "0.06em" }}>
                {saving ? "Sauvegarde..." : "💾 Sauvegarder"}
              </button>
            </div>
            {saveSuccess && <div style={{ textAlign: "center", marginTop: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2ECC71" }}>✓ Sauvegardé avec succès</div>}
          </div>
        </div>
      )}

      {/* ADMIN INDICATOR */}
      {isAdmin && (
        <div style={{ position: "fixed", top: 12, right: 12, zIndex: 90, background: ACCENT, color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "4px 10px", borderRadius: 3, letterSpacing: "0.08em" }}>
          ADMIN
        </div>
      )}
    </div>
  );
}
