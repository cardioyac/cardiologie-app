import { useState, useMemo, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gkkkiwvbvubzazdpjpea.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdra2tpd3ZidnViemF6ZHBqcGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTA4NjYsImV4cCI6MjA5ODEyNjg2Nn0.hoODoh83OQawIpqjTvq3Y0vQaPVZFPsoWwkKN2LSZCs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const ADMIN_PASSWORD = "cardio2024";
const ACCENT = "#C0392B";

const cardiologyTopics = [
  { id:1,letter:"A",title:"Arythmie cardiaque",subtitle:"Troubles du rythme",tags:["ECG","Holter","Antiarythmiques"],icon:"⚡",epidemiologie:"Les arythmies cardiaques touchent des millions de personnes dans le monde. La fibrillation auriculaire, forme la plus fréquente, affecte environ 1 à 2 % de la population générale, avec une prévalence croissante avec l'âge.",physiopathologie:"Les arythmies résultent d'anomalies de la formation ou de la conduction de l'influx électrique cardiaque. Elles peuvent être dues à un automatisme anormal, à des phénomènes de réentrée ou à des troubles de la conduction auriculo-ventriculaire.",diagnostique:"L'ECG de surface est l'examen clé. Un holter-ECG sur 24h ou plus permet de capturer des arythmies paroxystiques. L'exploration électrophysiologique (EEP) est indiquée dans les formes complexes.",traitement:"Le traitement dépend du type d'arythmie : antiarythmiques (bêtabloquants, amiodarone), cardioversion électrique, ablation par radiofréquence ou implantation d'un pacemaker ou défibrillateur selon les cas."},
  { id:2,letter:"A",title:"Athérosclérose",subtitle:"Maladie artérielle",tags:["Statines","Plaque","LDL"],icon:"🩸",epidemiologie:"Première cause de mortalité cardiovasculaire dans les pays occidentaux. Elle débute dès l'enfance et progresse silencieusement pendant des décennies.",physiopathologie:"Formation de plaques d'athérome dans la paroi artérielle par accumulation de lipides, de cellules inflammatoires et de tissu fibreux. La rupture de plaque déclenche une thrombose aiguë.",diagnostique:"Bilan lipidique (LDL, HDL, triglycérides), échographie vasculaire, score calcique coronaire, coronarographie en cas de suspicion de coronaropathie.",traitement:"Statines, antiagrégants plaquettaires, contrôle des facteurs de risque (HTA, diabète, tabagisme), régime méditerranéen, activité physique régulière."},
  { id:3,letter:"B",title:"Bloc auriculo-ventriculaire",subtitle:"Trouble de conduction",tags:["BAV","ECG","Pacemaker"],icon:"🔌",epidemiologie:"Le BAV du premier degré est fréquent (environ 1-2 % de la population générale). Les BAV de haut degré sont plus rares mais potentiellement graves.",physiopathologie:"Ralentissement ou interruption de la transmission de l'influx électrique entre oreillettes et ventricules au niveau du noeud auriculo-ventriculaire ou du faisceau de His.",diagnostique:"ECG : allongement du PR (BAV 1°), ondes P bloquées (BAV 2°), dissociation auriculo-ventriculaire complète (BAV 3°). Holter-ECG pour les formes paroxystiques.",traitement:"BAV 1° : surveillance. BAV 2° Mobitz II et BAV 3° : implantation d'un pacemaker définitif. En urgence : atropine IV."},
  { id:4,letter:"C",title:"Cardiomyopathie dilatée",subtitle:"Maladie du myocarde",tags:["Échocardiographie","FE","IEC"],icon:"🫀",epidemiologie:"Prévalence estimée à 1 sur 250 à 500 personnes. Principale indication de transplantation cardiaque dans les pays développés.",physiopathologie:"Dilatation et dysfonction systolique du ventricule gauche sans cause coronarienne ou valvulaire. Origine génétique, virale, toxique ou idiopathique.",diagnostique:"Échocardiographie : dilatation VG, FE abaissée (< 40 %). IRM cardiaque. BNP/NT-proBNP élevés.",traitement:"IEC ou ARA2, bêtabloquants, antagonistes de l'aldostérone, diurétiques. Défibrillateur si FE < 35 %. Transplantation en dernier recours."},
  { id:5,letter:"C",title:"Cardiopathie ischémique",subtitle:"Coronaropathie",tags:["Coronarographie","Stent","Angor"],icon:"💔",epidemiologie:"Première cause de mortalité mondiale. En France, environ 120 000 infarctus par an.",physiopathologie:"Réduction du flux sanguin coronaire par sténose athéromateuse fixe (angor stable) ou rupture de plaque avec thrombose (SCA).",diagnostique:"ECG, troponines, test d'ischémie, coronarographie pour confirmer et localiser les lésions.",traitement:"Angioplastie avec stent en urgence pour les SCA. Pontage pour les lésions pluritronculaires. Antiagrégants, statines, bêtabloquants, IEC."},
  { id:6,letter:"E",title:"Embolie pulmonaire",subtitle:"Urgence vasculaire",tags:["Anticoagulants","Héparine","TEP"],icon:"🫁",epidemiologie:"Incidence de 60 à 70 cas pour 100 000 personnes par an en Europe. Troisième cause de mortalité cardiovasculaire.",physiopathologie:"Obstruction d'une artère pulmonaire par un thrombus, souvent d'origine veineuse profonde. Entraîne une hypertension pulmonaire aiguë.",diagnostique:"Score de Wells, D-dimères, angio-scanner thoracique (gold standard), échocardiographie.",traitement:"Anticoagulation immédiate par héparine puis AOD. Thrombolyse ou embolectomie en cas de choc."},
  { id:7,letter:"E",title:"Endocardite infectieuse",subtitle:"Infection valvulaire",tags:["Hémocultures","Antibiotiques","Chirurgie"],icon:"🦠",epidemiologie:"Incidence de 3 à 7 cas pour 100 000 personnes par an. Mortalité hospitalière de 15-25 %.",physiopathologie:"Colonisation de l'endocarde par des micro-organismes avec formation de végétations friables pouvant emboliser.",diagnostique:"Critères de Duke : hémocultures positives + imagerie (ETT, ETO, scanner, PET-scan).",traitement:"Antibiothérapie bactéricide prolongée (4-6 semaines). Chirurgie en cas d'insuffisance cardiaque, d'abcès ou d'échec médical."},
  { id:8,letter:"F",title:"Fibrillation auriculaire",subtitle:"Arythmie fréquente",tags:["FA","Anticoagulation","Cardioversion"],icon:"〰️",epidemiologie:"Arythmie soutenue la plus fréquente : 1-2 % de la population, 10 % après 80 ans. Multiplie par 5 le risque d'AVC.",physiopathologie:"Activation électrique anarchique des oreillettes par multiples circuits de micro-réentrée, entraînant une stase sanguine dans l'auricule gauche.",diagnostique:"ECG : absence d'ondes P, rythme irrégulier. Holter si paroxystique. Échocardiographie.",traitement:"Anticoagulation au long cours (AOD ou AVK selon CHA2DS2-VASc). Contrôle de fréquence ou du rythme (cardioversion, ablation)."},
  { id:9,letter:"H",title:"Hypertension artérielle",subtitle:"Facteur de risque majeur",tags:["HTA","Antihypertenseurs","MAPA"],icon:"📈",epidemiologie:"Touche environ 30 % des adultes dans le monde. Principal facteur de risque modifiable d'AVC, d'infarctus et d'insuffisance cardiaque.",physiopathologie:"Élévation chronique des résistances vasculaires périphériques, souvent multifactorielle. Entraîne une hypertrophie VG et une artériosclérose.",diagnostique:"Mesure répétée >= 140/90 mmHg. MAPA ou automesure tensionnelle. Bilan des atteintes d'organes cibles.",traitement:"Règles hygiéno-diététiques. IEC ou ARA2, inhibiteurs calciques, diurétiques thiazidiques. Objectif < 130/80 mmHg."},
  { id:10,letter:"I",title:"Insuffisance cardiaque",subtitle:"Syndrome complexe",tags:["FE","BNP","Diurétiques"],icon:"💧",epidemiologie:"Affecte plus de 64 millions de personnes dans le monde. Mortalité à 5 ans d'environ 50 %.",physiopathologie:"Incapacité du coeur à assurer un débit adapté. Peut être systolique (FE abaissée) ou diastolique (FE préservée).",diagnostique:"Clinique : dyspnée, oedèmes. BNP élevé. Échocardiographie. Radiographie thoracique.",traitement:"IEC/ARA2/ARNI, bêtabloquants, antagonistes de l'aldostérone, gliflozines, diurétiques. DAI et resynchronisation selon critères."},
  { id:11,letter:"I",title:"Infarctus du myocarde",subtitle:"Occlusion coronaire aiguë",tags:["IDM","STEMI","Angioplastie"],icon:"🚨",epidemiologie:"Environ 700 000 cas par an en Europe. Mortalité hospitalière < 5 % grâce aux filières modernes.",physiopathologie:"Occlusion thrombotique aiguë d'une artère coronaire par rupture de plaque. Nécrose progressive de l'endocarde vers l'épicarde.",diagnostique:"Douleur thoracique + sus-décalage ST (STEMI) ou NSTEMI. Troponine élevée. Coronarographie en urgence.",traitement:"Angioplastie primaire dans les 90 minutes (STEMI). Double antiagrégation, anticoagulants, statines à haute dose, bêtabloquants, IEC."},
  { id:12,letter:"P",title:"Péricardite",subtitle:"Inflammation péricardique",tags:["AINS","Colchicine","Frottement"],icon:"🔥",epidemiologie:"Représente 5 % des consultations aux urgences pour douleur thoracique non ischémique. Risque de récidive de 15-30 %.",physiopathologie:"Inflammation du péricarde, le plus souvent d'origine virale ou idiopathique. Peut entraîner un épanchement péricardique.",diagnostique:"Triade : douleur positionnelle, frottement péricardique, anomalies ECG diffuses. Échocardiographie pour l'épanchement.",traitement:"AINS + colchicine pendant 3 mois. Repos sportif obligatoire. Corticoïdes si échec. Drainage si tamponnade."},
  { id:13,letter:"S",title:"Sténose aortique",subtitle:"Valvulopathie",tags:["TAVI","Gradient","Surface valvulaire"],icon:"🚪",epidemiologie:"Valvulopathie la plus fréquente dans les pays développés. Prévalence de 2-3 % après 65 ans.",physiopathologie:"Calcification progressive des feuillets valvulaires aortiques entraînant une obstruction à l'éjection du VG.",diagnostique:"Souffle systolique éjectif. Échocardiographie Doppler : gradient moyen, surface valvulaire (sévère si < 1 cm2).",traitement:"Remplacement valvulaire chirurgical (RVAC) ou percutané (TAVI) en cas de sténose sévère symptomatique."},
  { id:14,letter:"T",title:"Tamponnade cardiaque",subtitle:"Urgence péricardique",tags:["Péricardiocentèse","Épanchement","Beck"],icon:"⚠️",epidemiologie:"Urgence rare mais potentiellement fatale. Peut compliquer une péricardite, un traumatisme ou une procédure invasive.",physiopathologie:"Accumulation rapide de liquide dans le péricarde comprimant les cavités cardiaques et réduisant le débit cardiaque.",diagnostique:"Triade de Beck : hypotension, turgescence jugulaire, bruits assourdis. Pouls paradoxal. Échocardiographie en urgence.",traitement:"Péricardiocentèse en urgence. Expansion volémique en attente. Fenêtre péricardique chirurgicale si récidive."},
  { id:15,letter:"T",title:"Tachycardie ventriculaire",subtitle:"Arythmie grave",tags:["TV","Défibrillateur","Amiodarone"],icon:"⚡",epidemiologie:"Affecte principalement les patients avec cardiopathie ischémique. Cause majeure de mort subite cardiaque.",physiopathologie:"Rythme rapide (> 100 bpm) d'origine ventriculaire par mécanisme de réentrée. Peut dégénérer en fibrillation ventriculaire.",diagnostique:"ECG : tachycardie à complexes larges (QRS > 120 ms), dissociation auriculo-ventriculaire. Exploration électrophysiologique.",traitement:"TV bien tolérée : cardioversion ou amiodarone IV. TV mal tolérée : choc électrique immédiat. DAI + amiodarone au long cours."},
];

const ecgItems = [
  { id:1,letter:"B",title:"Bloc de branche gauche",subtitle:"Trouble de conduction",icon:"↙️",tags:["QRS > 120ms","V5-V6","Rsr'"],description:"Retard de dépolarisation du ventricule gauche. QRS >= 120 ms, aspect en plateau en V5-V6, onde S profonde en V1. Nécessite une évaluation cardiologique."},
  { id:2,letter:"B",title:"Bloc de branche droit",subtitle:"Trouble de conduction",icon:"↗️",tags:["QRS > 120ms","rSR' en V1","onde S"],description:"Retard de dépolarisation du ventricule droit. Aspect rSR' en V1-V2, onde S large en DI et V6. Souvent bénin mais peut être associé à une embolie pulmonaire."},
  { id:3,letter:"F",title:"Fibrillation ventriculaire",subtitle:"Urgence absolue",icon:"🌊",tags:["Choc électrique","RCP","Défibrillation"],description:"Activité électrique ventriculaire chaotique sans contraction efficace. Cause principale d'arrêt cardiaque. Traitement immédiat : défibrillation + RCP."},
  { id:4,letter:"H",title:"Hyperkaliémie",subtitle:"Trouble électrolytique",icon:"⚗️",tags:["Ondes T","QRS large","Kaliémie"],description:"Signes ECG progressifs : ondes T amples et pointues, allongement du PR, élargissement du QRS, aspect sinusoïdal. Urgence métabolique."},
  { id:5,letter:"I",title:"Ischémie sous-endocardique",subtitle:"Sus-décalage ST",icon:"📉",tags:["Sus-ST","STEMI","Coronaire"],description:"Sus-décalage du segment ST dans un territoire coronaire. Signe d'occlusion coronaire aiguë jusqu'à preuve du contraire. Coronarographie en moins de 90 minutes."},
  { id:6,letter:"Q",title:"QT long",subtitle:"Trouble de repolarisation",icon:"⏱️",tags:["QTc","Torsades","Médicaments"],description:"Allongement de l'intervalle QT corrigé (QTc > 450 ms chez l'homme, > 460 ms chez la femme). Risque de torsades de pointes et de mort subite."},
  { id:7,letter:"R",title:"Rythme sinusal normal",subtitle:"ECG de référence",icon:"✅",tags:["60-100 bpm","Onde P","PR normal"],description:"Fréquence entre 60 et 100 bpm, onde P positive en DII précédant chaque QRS, intervalle PR entre 120 et 200 ms, QRS fins (< 120 ms). Référence pour toute interprétation ECG."},
  { id:8,letter:"T",title:"Tachycardie sinusale",subtitle:"Arythmie fréquente",icon:"💨",tags:["> 100 bpm","Onde P","Fièvre"],description:"Fréquence cardiaque > 100 bpm avec rythme sinusal régulier. Causes : fièvre, douleur, anxiété, anémie, hyperthyroïdie, embolie pulmonaire."},
];

const medicaments = [
  { id:1,letter:"A",title:"Amiodarone",subtitle:"Antiarythmique classe III",icon:"💊",tags:["Cordarone","FA","TV"],indication:"Fibrillation auriculaire, tachycardie ventriculaire, flutter auriculaire.",mecanisme:"Bloque les canaux potassiques, sodiques et calciques. Allonge la durée du potentiel d'action.",posologie:"Charge : 200 mg x 3/j pendant 8-10 jours. Entretien : 200 mg/j. IV : 300 mg en bolus lent.",effetsIndesirables:"Dysthyroïdie, pneumopathie interstitielle, hépatotoxicité, photosensibilité, dépôts cornéens."},
  { id:2,letter:"A",title:"Aspirine",subtitle:"Antiagrégant plaquettaire",icon:"🔴",tags:["Kardégic","IDM","AVC"],indication:"Prévention secondaire après IDM, AVC ischémique, angioplastie coronaire.",mecanisme:"Inhibition irréversible de la COX-1 et COX-2, bloquant la synthèse du thromboxane A2.",posologie:"75 à 100 mg/j en prévention secondaire. 300 mg oral en phase aiguë d'infarctus.",effetsIndesirables:"Ulcères gastro-duodénaux, hémorragies digestives. Protection gastrique par IPP si risque élevé."},
  { id:3,letter:"B",title:"Bêtabloquants",subtitle:"Antihypertenseur / Antiarythmique",icon:"🛡️",tags:["Bisoprolol","HTA","IC"],indication:"Insuffisance cardiaque à FE abaissée, HTA, angor stable, post-infarctus, FA.",mecanisme:"Blocage compétitif des récepteurs bêta-adrénergiques. Réduction de la FC et de la PA.",posologie:"Bisoprolol : débuter à 1,25 mg/j, titrer jusqu'à 10 mg/j. Toujours introduire à faible dose.",effetsIndesirables:"Bradycardie, hypotension, fatigue, bronchospasme. Ne jamais arrêter brutalement."},
  { id:4,letter:"D",title:"Digoxine",subtitle:"Cardiotonique",icon:"🌿",tags:["Digoxine","FA","IC"],indication:"Contrôle de la fréquence ventriculaire dans la FA, insuffisance cardiaque à FE abaissée.",mecanisme:"Inhibition de la Na+/K+-ATPase. Effet inotrope positif et chronotrope négatif.",posologie:"0,125 à 0,25 mg/j. Adapter à la fonction rénale. Dosage sérique cible : 0,6-1,2 ng/mL.",effetsIndesirables:"Toxicité digitale : nausées, troubles visuels, bradycardie, arythmies. Aggravée par l'hypokaliémie."},
  { id:5,letter:"F",title:"Furosémide",subtitle:"Diurétique de l'anse",icon:"💧",tags:["Lasilix","IC","Oedèmes"],indication:"Insuffisance cardiaque aiguë et chronique, HTA résistante, syndrome néphrotique.",mecanisme:"Inhibition du cotransporteur Na-K-2Cl dans l'anse de Henlé. Puissant effet diurétique.",posologie:"Oral : 20-500 mg/j. IV : 20-80 mg en bolus. Surveiller kaliémie et créatinine.",effetsIndesirables:"Hypokaliémie, hyponatrémie, déshydratation, hypotension, ototoxicité à forte dose."},
  { id:6,letter:"H",title:"Héparine non fractionnée",subtitle:"Anticoagulant",icon:"🩺",tags:["HNF","SCA","EP"],indication:"Traitement initial des SCA, embolie pulmonaire massive, thrombose veineuse profonde.",mecanisme:"Potentialise l'antithrombine III, inhibant les facteurs Xa et IIa. Effet anticoagulant immédiat.",posologie:"Bolus IV : 60-80 UI/kg, puis perfusion de 12-18 UI/kg/h. TCA cible : 60-100 secondes.",effetsIndesirables:"Hémorragies, thrombocytopénie induite (TIH). Antidote : protamine."},
  { id:7,letter:"I",title:"Ivabradine",subtitle:"Bradycardisant",icon:"🎯",tags:["Procoralan","IC","Angor"],indication:"Insuffisance cardiaque à FE <= 35 % en rythme sinusal avec FC >= 70 bpm malgré bêtabloquants.",mecanisme:"Inhibition sélective du courant If dans le noeud sinusal, réduisant la FC sans effet inotrope.",posologie:"5 mg x 2/j au cours des repas. Augmentation possible à 7,5 mg x 2/j après 2 semaines.",effetsIndesirables:"Phosphènes, bradycardie, allongement du QT. Contre-indiqué en FA et BAV 2° et 3°."},
  { id:8,letter:"S",title:"Statines",subtitle:"Hypolipémiant",icon:"⚕️",tags:["Atorvastatine","LDL","Prévention"],indication:"Prévention primaire et secondaire. Objectif LDL < 0,55 g/L en très haut risque cardiovasculaire.",mecanisme:"Inhibition de la HMG-CoA réductase. Réduction du LDL de 30 à 55 %. Effets anti-inflammatoires.",posologie:"Atorvastatine 40-80 mg/j ou rosuvastatine 20-40 mg/j en prévention secondaire.",effetsIndesirables:"Myalgies, myopathie, rhabdomyolyse (rare), élévation des transaminases."},
];

const CLINICAL_SECTIONS = [
  { key:"epidemiologie", label:"Épidémiologie" },
  { key:"physiopathologie", label:"Physiopathologie" },
  { key:"diagnostique", label:"Diagnostique" },
  { key:"traitement", label:"Traitement" },
];
const DRUG_SECTIONS = [
  { key:"indication", label:"Indication" },
  { key:"mecanisme", label:"Mécanisme" },
  { key:"posologie", label:"Posologie" },
  { key:"effetsIndesirables", label:"Effets indésirables" },
];
const NAV_TABS = [
  { key:"pathologies", label:"Pathologies", icon:"🫀" },
  { key:"ecg", label:"ECG", icon:"📈" },
  { key:"medicaments", label:"Médicaments", icon:"💊" },
  { key:"local", label:"Chalon", icon:"🏥" },
];

const DOCTORS = [
  { nom:"Dr BUTTARD Patrick", tel:"22 11 01" },
  { nom:"Dr BILLOD Calixte", tel:"22 11 45" },
  { nom:"Dr CHATAR", tel:"22 11 44" },
  { nom:"Dr CHENNA Yacine", tel:"22 11 04" },
  { nom:"Dr DOISE Jean-Marc", tel:"22 02 85" },
  { nom:"Dr EMSELLEM Philippe", tel:"22 11 39" },
  { nom:"Dr FAYARD Maxime", tel:"22 11 05" },
  { nom:"Dr HAMBLIN Joëlle", tel:"22 11 15" },
  { nom:"Dr MIRABET", tel:"22 11 42" },
  { nom:"Dr NGUYEN", tel:"22 02 55" },
  { nom:"Dr PHILIP", tel:"22 03 14" },
  { nom:"Dr VENET", tel:"22 11 33" },
  { nom:"Dr YOU", tel:"22 02 54" },
];

export default function CardiologyApp() {
  const [mainTab, setMainTab] = useState("pathologies");
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [activeSection, setActiveSection] = useState("epidemiologie");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [logoTaps, setLogoTaps] = useState(0);
  const [dbMedicaments, setDbMedicaments] = useState([]);
  const [dbPathologies, setDbPathologies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [ecgImages, setEcgImages] = useState({});
  const [uploadingEcg, setUploadingEcg] = useState(false);

  const parseTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    try { const p = JSON.parse(tags); if (Array.isArray(p)) return p; } catch(e) {}
    return tags.split(",").map(t => t.trim()).filter(Boolean);
  };

  useEffect(() => { fetchMedicaments(); fetchPathologies(); }, []);

  const fetchMedicaments = async () => {
    const { data } = await supabase.from("medicaments").select("*").order("title");
    if (data && data.length > 0) setDbMedicaments(data.map(item => ({ ...item, tags: parseTags(item.tags) })));
  };

  const fetchPathologies = async () => {
    const { data } = await supabase.from("pathologies").select("*").order("title");
    if (data && data.length > 0) setDbPathologies(data.map(item => ({ ...item, tags: parseTags(item.tags) })));
  };

  const fetchEcgImages = async (ecgId) => {
    const { data } = await supabase.storage.from("ecg-images").list("ecg-" + ecgId + "/");
    if (data && data.length > 0) {
      const urls = data.map(file => ({
        name: file.name,
        url: supabase.storage.from("ecg-images").getPublicUrl("ecg-" + ecgId + "/" + file.name).data.publicUrl,
      }));
      setEcgImages(prev => ({ ...prev, [ecgId]: urls }));
    }
  };

  const handleEcgUpload = async (ecgId, e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingEcg(true);
    for (const file of files) {
      const filename = Date.now() + "-" + file.name;
      await supabase.storage.from("ecg-images").upload("ecg-" + ecgId + "/" + filename, file);
    }
    await fetchEcgImages(ecgId);
    setUploadingEcg(false);
  };

  const handleEcgDeleteImage = async (ecgId, filename) => {
    await supabase.storage.from("ecg-images").remove(["ecg-" + ecgId + "/" + filename]);
    setEcgImages(prev => ({ ...prev, [ecgId]: (prev[ecgId] || []).filter(img => img.name !== filename) }));
  };

  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("- ") || line.startsWith("• ")) {
        const content = line.replace(/^[-•]\s/, "");
        const parts = content.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={i} style={{ display:"flex", gap:10, marginBottom:6 }}>
            <span style={{ color:ACCENT, fontWeight:700, flexShrink:0 }}>•</span>
            <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</span>
          </div>
        );
      }
      if (line === "") return <div key={i} style={{ height:8 }} />;
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return <div key={i} style={{ marginBottom:4 }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</div>;
    });
  };

  const handleEdit = (item) => { setEditData({ ...item }); setEditMode(true); };

  const handleSave = async () => {
    setSaving(true);
    const table = mainTab === "medicaments" ? "medicaments" : "pathologies";
    const { id, ...fields } = editData;
    if (id && typeof id === "number") await supabase.from(table).update(fields).eq("id", id);
    else await supabase.from(table).insert([fields]);
    if (table === "medicaments") await fetchMedicaments(); else await fetchPathologies();
    setSaving(false); setSaveSuccess(true); setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleLogoTap = () => {
    const n = logoTaps + 1; setLogoTaps(n);
    if (n >= 3) { setShowAdminLogin(true); setLogoTaps(0); }
    setTimeout(() => setLogoTaps(0), 2000);
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) { setIsAdmin(true); setShowAdminLogin(false); setAdminPassword(""); setAdminError(""); }
    else setAdminError("Mot de passe incorrect");
  };

  const activeMedicaments = dbMedicaments.length > 0 ? dbMedicaments : medicaments;
  const activePathologies = dbPathologies.length > 0 ? dbPathologies : cardiologyTopics;
  const currentData = mainTab === "pathologies" ? activePathologies : mainTab === "ecg" ? ecgItems : activeMedicaments;
  const sections = mainTab === "medicaments" ? DRUG_SECTIONS : CLINICAL_SECTIONS;
  const defaultSection = mainTab === "medicaments" ? "indication" : "epidemiologie";
  const alphabet = [...new Set(currentData.map(t => t.letter))].sort();

  const filtered = useMemo(() => currentData.filter(t => {
    const ms = t.title.toLowerCase().includes(search.toLowerCase()) || t.subtitle.toLowerCase().includes(search.toLowerCase()) || (t.tags || []).some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const ml = activeLetter ? t.letter === activeLetter : true;
    return ms && ml;
  }), [search, activeLetter, currentData]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(t => { if (!g[t.letter]) g[t.letter] = []; g[t.letter].push(t); });
    return g;
  }, [filtered]);

  const selectedItem = activeCard && typeof activeCard === "number" ? currentData.find(t => t.id === activeCard) : null;

  const openDetail = (id) => { setActiveCard(id); setActiveSection(defaultSection); if (mainTab === "ecg") fetchEcgImages(id); };

  const switchTab = (tab) => { setMainTab(tab); setSearch(""); setActiveLetter(null); setActiveCard(null); };

  const getDetailContent = (item, section) => {
    if (item[section]) return item[section];
    if (section === "epidemiologie" && item.description) return item.description;
    return "Contenu à venir.";
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    .si { background:#F7F4F0; border:1px solid #DDD5CC; border-radius:6px; color:#1A1A1A; font-family:'JetBrains Mono',monospace; font-size:13px; padding:10px 16px 10px 36px; width:100%; outline:none; transition:border-color 0.2s; }
    .si::placeholder { color:#B0A89E; }
    .si:focus { border-color:${ACCENT}; background:#fff; }
    .lb { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:600; padding:6px 12px; background:transparent; border:1px solid transparent; border-radius:4px; cursor:pointer; transition:all 0.15s; color:#A09080; }
    .lb:hover { color:${ACCENT}; border-color:#EADDD5; background:#FDF5F3; }
    .lb.active { color:${ACCENT}; border-color:${ACCENT}60; background:#FDF0EE; }
    .tc { background:#FFFFFF; border:1px solid #EDE6DF; border-radius:8px; padding:20px; cursor:pointer; transition:all 0.2s; position:relative; overflow:hidden; }
    .tc::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:transparent; transition:background 0.2s; border-radius:8px 0 0 8px; }
    .tc:hover { border-color:#DDD0C8; box-shadow:0 2px 12px rgba(0,0,0,0.07); transform:translateY(-1px); }
    .tc:hover::before { background:${ACCENT}; }
    .tc.sel { border-color:${ACCENT}50; }
    .tc.sel::before { background:${ACCENT}; }
    .lgh { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:700; color:${ACCENT}; line-height:1; margin-bottom:12px; user-select:none; border-left:4px solid ${ACCENT}; padding-left:12px; }
    .tp { font-family:'JetBrains Mono',monospace; font-size:10px; padding:3px 9px; background:#F2EDE8; border-radius:3px; color:#8C7B6E; letter-spacing:0.05em; white-space:nowrap; }
    .st { font-family:'JetBrains Mono',monospace; font-size:10px; padding:7px 14px; background:transparent; border:1px solid #EDE6DF; border-radius:3px; cursor:pointer; transition:all 0.15s; color:#A09080; letter-spacing:0.08em; text-transform:uppercase; white-space:nowrap; }
    .st:hover { border-color:#DDD0C8; color:#5A4A40; }
    .st.active { background:#FDF0EE; border-color:${ACCENT}50; color:${ACCENT}; }
    .uz { display:block; border:2px dashed #DDD5CC; border-radius:8px; padding:20px; text-align:center; cursor:pointer; transition:all 0.2s; background:#FDFAF8; }
    .uz:hover { border-color:${ACCENT}60; background:#FDF5F3; }
    .uz input { display:none; }
    .ig { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:12px; }
    .ii { position:relative; border-radius:6px; overflow:hidden; border:1px solid #EDE6DF; }
    .ii img { width:100%; height:160px; object-fit:contain; display:block; background:#fff; }
    .id { position:absolute; top:6px; right:6px; background:rgba(255,255,255,0.92); border:1px solid #EDE6DF; border-radius:3px; width:24px; height:24px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:14px; color:#A09080; transition:all 0.15s; }
    .id:hover { background:#FDF0EE; color:${ACCENT}; }
    .ic { padding:5px 8px; font-family:'JetBrains Mono',monospace; font-size:9px; color:#A09080; background:#FDFAF8; letter-spacing:0.04em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .bn { position:fixed; bottom:0; left:0; right:0; background:#FFFFFF; border-top:1px solid #EDE6DF; display:flex; z-index:40; box-shadow:0 -4px 20px rgba(0,0,0,0.06); }
    .nb { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 0 12px; background:transparent; border:none; cursor:pointer; transition:all 0.15s; gap:4px; position:relative; }
    .nb.active { background:#FDF5F3; }
    .nl { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:0.08em; text-transform:uppercase; color:#B0A090; }
    .nb.active .nl { color:${ACCENT}; }
    @keyframes slideIn { from { transform:translateX(100%); } to { transform:translateX(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-thumb { background:#DDD5CC; border-radius:2px; }
  `;

  return (
    <div style={{ minHeight:"100vh", background:"#F7F4F0", fontFamily:"'Georgia',serif", color:"#1A1A1A", paddingBottom:80 }}>
      <style>{css}</style>

      {/* HEADER */}
      <div style={{ background:"#FFFFFF", borderBottom:"1px solid #E8E0D8", padding:"32px 24px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:"#B08070", letterSpacing:"0.15em", textTransform:"uppercase" }}>v1.0 — Référentiel clinique</span>
          <h1 onClick={handleLogoTap} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,56px)", fontWeight:300, letterSpacing:"-0.02em", lineHeight:1, marginBottom:8, color:"#1A1A1A", cursor:"default", userSelect:"none", marginTop:4 }}>
            Cardiologie<span style={{ color:ACCENT, fontStyle:"italic" }}> Clinique</span>
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#A09080", fontStyle:"italic", marginBottom:20 }}>
            {mainTab === "pathologies" && "Pathologies cardiovasculaires — classification alphabétique"}
            {mainTab === "ecg" && "Interprétation ECG — classification alphabétique"}
            {mainTab === "medicaments" && "Médicaments cardiovasculaires — classification alphabétique"}
            {mainTab === "local" && "Ressources locales — Chalon-sur-Saône"}
          </p>
          {mainTab !== "local" && (
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#C0A090", fontSize:14 }}>⌕</span>
              <input className="si" placeholder={"Rechercher..."} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          )}
        </div>
      </div>

      {/* ALPHABET NAV */}
      {mainTab !== "local" && (
        <div style={{ borderBottom:"1px solid #EDE6DF", padding:"10px 24px", background:"#FDFAF8", overflowX:"auto" }}>
          <div style={{ display:"flex", gap:4, minWidth:"max-content" }}>
            <button className={"lb" + (!activeLetter ? " active" : "")} onClick={() => setActiveLetter(null)}>Tous</button>
            {alphabet.map(l => <button key={l} className={"lb" + (activeLetter === l ? " active" : "")} onClick={() => setActiveLetter(activeLetter === l ? null : l)}>{l}</button>)}
          </div>
        </div>
      )}

      {/* CONTENT LIST */}
      {mainTab !== "local" && (
        <div style={{ maxWidth:900, margin:"0 auto", padding:"24px" }}>
          {Object.keys(grouped).length === 0
            ? <div style={{ textAlign:"center", padding:"80px 0", color:"#C0B0A0", fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontStyle:"italic" }}>Aucun résultat trouvé</div>
            : Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).map(([letter, items]) => (
              <div key={letter} style={{ marginBottom:48 }}>
                <div className="lgh">{letter}</div>
                <div style={{ display:"grid", gap:12 }}>
                  {items.map(item => (
                    <div key={item.id} className={"tc" + (activeCard === item.id ? " sel" : "")} onClick={() => openDetail(item.id)}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                        <span style={{ fontSize:22 }}>{item.icon}</span>
                        <div>
                          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"#1A1A1A" }}>{item.title}</div>
                          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#B0A090", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:2 }}>{item.subtitle}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {(item.tags || []).map(tag => <span key={tag} className="tp">{tag}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* DETAIL PAGE */}
      {selectedItem && (
        <div style={{ position:"fixed", inset:0, background:"#F7F4F0", zIndex:50, overflowY:"auto", animation:"slideIn 0.25s ease" }}>
          <div style={{ position:"sticky", top:0, background:"#FFFFFF", borderBottom:"1px solid #EDE6DF", zIndex:10, padding:"14px 24px", display:"flex", alignItems:"center", gap:16 }}>
            <button onClick={() => setActiveCard(null)} style={{ display:"flex", alignItems:"center", gap:8, background:"transparent", border:"none", cursor:"pointer", color:ACCENT, fontFamily:"'JetBrains Mono',monospace", fontSize:12, letterSpacing:"0.06em", padding:"6px 0" }}>← Retour</button>
            <div style={{ height:16, width:1, background:"#EDE6DF" }} />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:"#1A1A1A", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{selectedItem.title}</span>
            <span style={{ fontSize:22 }}>{selectedItem.icon}</span>
            {isAdmin && (mainTab === "medicaments" || mainTab === "pathologies") && (
              <button onClick={() => handleEdit(selectedItem)} style={{ background:ACCENT, border:"none", borderRadius:4, color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"6px 12px", cursor:"pointer" }}>Modifier Modifier</button>
            )}
          </div>

          <div style={{ background:"#FFFFFF", padding:"28px 24px 24px", borderBottom:"1px solid #EDE6DF" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#B08070", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:6 }}>{selectedItem.subtitle}</div>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:400, letterSpacing:"-0.02em", lineHeight:1.1, color:"#1A1A1A", marginBottom:16 }}>{selectedItem.title}</h1>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {(selectedItem.tags || []).map(tag => <span key={tag} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"4px 12px", background:"#FDF0EE", border:"1px solid " + ACCENT + "30", borderRadius:3, color:ACCENT }}>{tag}</span>)}
            </div>
          </div>

          <div style={{ background:"#FDFAF8", borderBottom:"1px solid #EDE6DF", padding:"12px 24px", display:"flex", gap:8, overflowX:"auto" }}>
            {sections.map(s => <button key={s.key} className={"st" + (activeSection === s.key ? " active" : "")} onClick={() => setActiveSection(s.key)} style={{ flexShrink:0 }}>{s.label}</button>)}
          </div>

          <div style={{ maxWidth:700, margin:"0 auto", padding:"32px 24px" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:ACCENT, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:16 }}>
              {sections.find(s => s.key === activeSection)?.label}
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:"#2A1A10", lineHeight:1.9 }}>
              {renderMarkdown(getDetailContent(selectedItem, activeSection))}
            </div>

            {/* ECG IMAGES */}
            {mainTab === "ecg" && (
              <div style={{ marginTop:40, paddingTop:28, borderTop:"1px solid #EDE6DF" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#B0A090", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>
                  Tracés ECG — {ecgImages[selectedItem.id]?.length || 0} image{(ecgImages[selectedItem.id]?.length || 0) !== 1 ? "s" : ""}
                </div>
                {ecgImages[selectedItem.id]?.length > 0 && (
                  <div className="ig" style={{ marginBottom:16 }}>
                    {ecgImages[selectedItem.id].map((img, i) => (
                      <div key={i} className="ii" onClick={() => window.open(img.url, "_blank")} style={{ cursor:"pointer" }}>
                        <img src={img.url} alt={img.name} />
                        {isAdmin && <button className="id" onClick={ev => { ev.stopPropagation(); handleEcgDeleteImage(selectedItem.id, img.name); }}>×</button>}
                        <div className="ic">{img.name}</div>
                      </div>
                    ))}
                  </div>
                )}
                {isAdmin && (
                  <label className="uz">
                    <input type="file" accept="image/*" multiple onChange={e => handleEcgUpload(selectedItem.id, e)} />
                    {uploadingEcg
                      ? <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:ACCENT }}>Upload en cours...</div>
                      : <>
                          <div style={{ fontSize:32, marginBottom:8 }}>Photo</div>
                          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#8C7B6E", fontStyle:"italic" }}>Ajouter un tracé ECG</div>
                          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#C0B0A0", marginTop:4 }}>Photo · Scan · Capture</div>
                        </>
                    }
                  </label>
                )}
                {!isAdmin && !ecgImages[selectedItem.id]?.length && (
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#C0B0A0", fontStyle:"italic" }}>Aucun tracé disponible pour le moment.</p>
                )}
              </div>
            )}

            <div style={{ marginTop:32, paddingTop:20, borderTop:"1px solid #EDE6DF" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#C0B0A0", fontStyle:"italic" }}>
                Application à vocation éducative — Toujours se référer aux recommandations de la Société Européenne de Cardiologie (ESC).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LOCAL SECTION */}
      {mainTab === "local" && !activeCard && (
        <div style={{ maxWidth:700, margin:"0 auto", padding:"32px 24px" }}>
          <div style={{ marginBottom:32 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#B08070", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:8 }}>Cardiologie</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, color:"#1A1A1A" }}>Chalon-sur-Saône</h2>
            <div style={{ height:2, width:40, background:ACCENT, marginTop:12 }} />
          </div>
          {[
            { key:"annuaire", icon:"📋", title:"Annuaire", description:"Coordonnées des médecins et services de cardiologie." },
            { key:"reglement", icon:"📜", title:"Règlement", description:"Protocoles et procédures internes du service." },
            { key:"prescription", icon:"✍️", title:"Aide à la prescription", description:"Fiches pratiques et ordonnances-types." },
          ].map(item => (
            <div key={item.key} className="tc" style={{ marginBottom:16 }} onClick={() => setActiveCard(item.key)}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <span style={{ fontSize:28 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#1A1A1A" }}>{item.title}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:"#8C7B6E", fontStyle:"italic", marginTop:4 }}>{item.description}</div>
                </div>
                <span style={{ marginLeft:"auto", color:"#C0B0A0", fontSize:20 }}>›</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOCAL DETAIL */}
      {mainTab === "local" && activeCard && (
        <div style={{ position:"fixed", inset:0, background:"#F7F4F0", zIndex:50, overflowY:"auto", animation:"slideIn 0.25s ease" }}>
          <div style={{ position:"sticky", top:0, background:"#FFFFFF", borderBottom:"1px solid #EDE6DF", zIndex:10, padding:"14px 24px", display:"flex", alignItems:"center", gap:16 }}>
            <button onClick={() => setActiveCard(null)} style={{ display:"flex", alignItems:"center", gap:8, background:"transparent", border:"none", cursor:"pointer", color:ACCENT, fontFamily:"'JetBrains Mono',monospace", fontSize:12, letterSpacing:"0.06em", padding:"6px 0" }}>← Retour</button>
            <div style={{ height:16, width:1, background:"#EDE6DF" }} />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:"#1A1A1A" }}>
              {activeCard === "annuaire" ? "Annuaire" : activeCard === "reglement" ? "Règlement" : "Aide à la prescription"}
            </span>
          </div>

          {activeCard === "annuaire" && (
            <div style={{ maxWidth:700, margin:"0 auto", padding:"32px 24px" }}>
              {[
                { icon:"🩺", title:"Médecin", content: DOCTORS },
                { icon:"🫀", title:"Cardiologie", content: null },
                { icon:"🚨", title:"USIC", content: null },
                { icon:"📞", title:"Avis", content: null },
              ].map(sub => (
                <div key={sub.title} className="tc" style={{ marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <span style={{ fontSize:28 }}>{sub.icon}</span>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#1A1A1A" }}>{sub.title}</div>
                  </div>
                  <div style={{ marginTop:16, paddingTop:14, borderTop:"1px solid #EDE6DF" }}>
                    {sub.content ? sub.content.map((item, i) => (
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom: i < sub.content.length - 1 ? "1px solid #F2EDE8" : "none" }}>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:"#1A1A1A" }}>{item.nom}</span>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:ACCENT, fontWeight:700 }}>{item.tel}</span>
                      </div>
                    )) : <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#A09080", fontStyle:"italic" }}>Contenu à venir.</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeCard === "reglement" || activeCard === "prescription") && (
            <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 24px" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:"#8C7B6E", fontStyle:"italic", textAlign:"center", marginTop:60 }}>Contenu à venir.</p>
            </div>
          )}
        </div>
      )}

      {/* BOUTON NOUVEAU MÉDICAMENT */}
      {isAdmin && mainTab === "medicaments" && !activeCard && (
        <div style={{ position:"fixed", bottom:90, right:20, zIndex:50 }}>
          <button onClick={() => { setEditData({ title:"", subtitle:"", icon:"💊", letter:"", tags:"", indication:"", mecanisme:"", posologie:"", effetsIndesirables:"" }); setEditMode(true); }} style={{ background:ACCENT, border:"none", borderRadius:"50px", color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"14px 20px", cursor:"pointer", boxShadow:"0 4px 20px rgba(192,57,43,0.4)", letterSpacing:"0.06em", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>+</span> Nouveau médicament
          </button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="bn">
        {NAV_TABS.map(tab => (
          <button key={tab.key} className={"nb" + (mainTab === tab.key ? " active" : "")} onClick={() => switchTab(tab.key)}>
            <span style={{ fontSize:22 }}>{tab.icon}</span>
            <span className="nl">{tab.label}</span>
            {mainTab === tab.key && <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:3, background:ACCENT, borderRadius:"2px 2px 0 0" }} />}
          </button>
        ))}
      </div>

      {/* ADMIN LOGIN */}
      {showAdminLogin && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:24, animation:"fadeIn 0.2s ease" }}>
          <div style={{ background:"#FFF", borderRadius:12, padding:32, width:"100%", maxWidth:360, border:"1px solid #EDE6DF", boxShadow:"0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:600, color:"#1A1A1A", marginBottom:4 }}>Espace Admin</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#B08070", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:24 }}>Accès restreint</div>
            <input type="password" placeholder="Mot de passe" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdminLogin()} style={{ width:"100%", padding:"10px 14px", border:"1px solid " + (adminError ? ACCENT : "#DDD5CC"), borderRadius:6, fontFamily:"'JetBrains Mono',monospace", fontSize:13, outline:"none", marginBottom:8, background:"#F7F4F0" }} />
            {adminError && <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:ACCENT, marginBottom:12 }}>{adminError}</div>}
            <div style={{ display:"flex", gap:8, marginTop:16 }}>
              <button onClick={() => { setShowAdminLogin(false); setAdminPassword(""); setAdminError(""); }} style={{ flex:1, padding:"10px", background:"#F7F4F0", border:"1px solid #DDD5CC", borderRadius:6, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#8C7B6E" }}>Annuler</button>
              <button onClick={handleAdminLogin} style={{ flex:1, padding:"10px", background:ACCENT, border:"none", borderRadius:6, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#fff" }}>Connexion</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editMode && editData && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:24, overflowY:"auto", animation:"fadeIn 0.2s ease" }}>
          <div style={{ background:"#FFF", borderRadius:12, padding:32, width:"100%", maxWidth:560, border:"1px solid #EDE6DF", boxShadow:"0 20px 60px rgba(0,0,0,0.15)", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:600, color:"#1A1A1A", marginBottom:4 }}>{editData.id ? "Modifier Modifier" : "Nouveau Nouveau médicament"}</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#B08070", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:24 }}>{editData.title || "Nouveau"}</div>

            {!editData.id && (
              <div>
                {[{ key:"title", label:"Nom" }, { key:"subtitle", label:"Classe thérapeutique" }, { key:"icon", label:"Icône (emoji)" }, { key:"letter", label:"Lettre (ex: A)" }, { key:"tags", label:"Tags (séparés par virgules)" }].map(field => (
                  <div key={field.key} style={{ marginBottom:16 }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{field.label}</div>
                    <input value={editData[field.key] || ""} onChange={e => setEditData({ ...editData, [field.key]: e.target.value })} style={{ width:"100%", padding:"10px 14px", border:"1px solid #DDD5CC", borderRadius:6, fontFamily:"'Cormorant Garamond',serif", fontSize:15, outline:"none", background:"#F7F4F0" }} />
                  </div>
                ))}
                <div style={{ height:1, background:"#EDE6DF", margin:"20px 0" }} />
              </div>
            )}

            {(mainTab === "medicaments" ? DRUG_SECTIONS : CLINICAL_SECTIONS).map(field => (
              <div key={field.key} style={{ marginBottom:20 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{field.label}</div>
                <div style={{ display:"flex", gap:6, marginBottom:6 }}>
                  {[
                    { label:"• Liste", fn: (v, ss, ee) => v.substring(0,ss) + "\n- " + v.substring(ss,ee) + v.substring(ee) },
                    { label:"**Gras**", fn: (v, ss, ee) => v.substring(0,ss) + "**" + (v.substring(ss,ee) || "texte") + "**" + v.substring(ee) },
                    { label:"↵ Saut", fn: (v, ss, ee) => v.substring(0,ss) + "\n" + v.substring(ee) },
                  ].map(btn => (
                    <button key={btn.label} type="button" onClick={() => { const el = document.getElementById("ta-" + field.key); if (!el) return; const ss = el.selectionStart; const ee = el.selectionEnd; setEditData({ ...editData, [field.key]: btn.fn(editData[field.key] || "", ss, ee) }); }} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"4px 10px", background:"#F2EDE8", border:"1px solid #DDD5CC", borderRadius:3, cursor:"pointer", color:"#6A5A50" }}>{btn.label}</button>
                  ))}
                </div>
                <textarea id={"ta-" + field.key} value={editData[field.key] || ""} onChange={e => setEditData({ ...editData, [field.key]: e.target.value })} rows={5} style={{ width:"100%", padding:"10px 14px", border:"1px solid #DDD5CC", borderRadius:6, fontFamily:"'Cormorant Garamond',serif", fontSize:15, outline:"none", background:"#F7F4F0", resize:"vertical", lineHeight:1.7 }} />
              </div>
            ))}

            <div style={{ display:"flex", gap:8, marginTop:8 }}>
              <button onClick={() => setEditMode(false)} style={{ flex:1, padding:"12px", background:"#F7F4F0", border:"1px solid #DDD5CC", borderRadius:6, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#8C7B6E" }}>Annuler</button>
              <button onClick={handleSave} disabled={saving} style={{ flex:2, padding:"12px", background:ACCENT, border:"none", borderRadius:6, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#fff" }}>{saving ? "Sauvegarde..." : "Sauvegarder Sauvegarder"}</button>
            </div>
            {saveSuccess && <div style={{ textAlign:"center", marginTop:12, fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#2ECC71" }}>OK Sauvegardé avec succès</div>}
          </div>
        </div>
      )}

      {/* ADMIN INDICATOR */}
      {isAdmin && <div style={{ position:"fixed", top:12, right:12, zIndex:90, background:ACCENT, color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontSize:10, padding:"4px 10px", borderRadius:3, letterSpacing:"0.08em" }}>ADMIN</div>}
    </div>
  );
}
