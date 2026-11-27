import { TikaEntry } from "./types";

const MUNDAKA_1_1_1_2_TIKA =
  "प्रथमं मुण्डकम्: प्रथमः खण्डः\n\n" +
  "यदक्षरं परं ब्रह्म विद्यागम्यमतीरितम् ।\n" +
  "यस्मिञ्ज्ञाते भवेज्ज्ञातं सर्वं तत्स्यामसंशयम् ॥१॥\n\n" +
  "ब्रह्मोपनिषद्गर्भोपनिषदाद्या अथर्वणवेदस्य बह्व्य उपनिषदः सन्ति । तासां शारीरकेऽनुपयोगित्वेनाव्याचिख्यासितत्वाददृश्यत्वादिगुणको धर्मोक्ते (ब्र० १।२।२१) रित्याद्यधिकरणोपयोगितया मुण्डकस्य व्याचिख्यासितस्य प्रतीकमादत्ते –\n" +
  "ब्रह्मादेवानामित्याद्याथर्वणोपनिषदिति ।\n" +
  "व्याचिख्यासितेति शेषः । नन्वियमुपनिषन्मन्त्ररूपा मन्त्राणां चेषे त्वेत्यादीनां कर्मसंबन्धेनैव प्रयोजनवत्त्वम् । एतेषां च मन्त्राणां कर्मसु विनियोजकप्रमाणानुपलम्भेन तत्संबन्धासंभवान्निष्प्रयोजनत्वाद्व्याचिख्यासितत्वं न संभवतीति शङ्कमानस्योत्तरम् । सत्यं कर्मसंबन्धाभावेऽपि ब्रह्मविद्याप्रकाशनसामर्थ्याद्विद्यया संबन्धो भविष्यति ।\n\n" +
  "ननु विद्यायाः पुरुषकर्तृकत्वात्तत्प्रकाशकत्वेऽस्या उपनिषदोऽपि पौरुषेयत्वप्रसङ्गात्पाक्षिकपुरुषदोषजत्वशङ्कयाऽप्रामाण्याद्व्याचिख्यासितत्वं नोपपद्यत इत्याशङ्क्याऽऽह –\n" +
  "अस्याश्चेति ।\n" +
  "विद्यायाः सम्प्रदायप्रवर्तका एव पुरुषा न तूत्प्रेक्षया निर्मातारः । सम्प्रदायकर्तृत्वमपि नाधुनातनं येनानाश्वासः स्यात् किन्त्वनादिपारम्पर्यागतम् । ततोऽनादिप्रसिद्धब्रह्मविद्याप्रकाशनसमर्थोपनिषदः पुरुषसम्बन्धः सम्प्रदायकर्तृत्वपारम्पर्यलक्षण एव तमादावेवाऽऽहेत्यर्थः ।\n\n" +
  "विद्यासम्प्रदायकर्तृत्वमेव पुरुषाणाम् । यथा विद्यायाः पुरुषसम्बन्धस्तथैवोपनिषदोऽपि यदि पुरुषसम्बन्धो विवक्षितः पौरुषेयत्वपरिहाराय तर्हि तथाभूतसम्बन्धाभिधायकेनान्येन भवितव्यं स्वयमेव स्वसम्बन्धाभिधायकत्वे स्ववृत्तिप्रसङ्गादित्याशङ्क्याऽऽह –\n" +
  "स्वयमेव स्तुत्यर्थमिति ।\n\n" +
  "विद्यास्तुतौ तात्पर्यान्न स्ववृत्तिर्दोष इत्यर्थः । स्तुतिर्वा किमर्थत्यत आह –\n" +
  "श्रोतृबुद्धीति ।\n" +
  "प्रवर्तेरन्निति पाठो युक्तः । वृतुधातोरात्मनेपदित्वात् ।\n\n" +
  "विद्याया यत्प्रयोजनं तदेवास्या उपनिषदोऽपि प्रयोजनं भविष्यतीत्यभिप्रेत्य विद्यायाः प्रयोजनसंबन्धमाह –\n" +
  "प्रयोजनेन त्विति ।\n\n" +
  "संसारकारणनिवृत्तिर्ब्रह्मविद्याफलं चेत्तर्ह्यपरविद्ययैव तन्निवृत्तेः संभवान्न तदर्थं ब्रह्मविद्याप्रकाशकोपनिषद्व्याख्यातव्येत्याशङ्क्याऽऽह –\n" +
  "अत्र चेति ।\n" +
  "संसारकारणमविद्यादिदोषस्तन्निवर्तकत्वमपरविद्यायाः कर्मात्मिकायाः न संभवत्यविरोधात् । न हि शतशोऽपि प्राणायामं कुर्वतः शुक्तिदर्शनं विना तदविद्यानिवृत्तिर्दृश्यते । ततोऽपरविद्यायाः संसारकारणाविद्यानिवर्तकत्वं नास्तीति स्वयमेवोक्त्वा ब्रह्मविद्यामाहेति संबन्धः ।\n\n" +
  "किञ्च परमपुरुषार्थसाधनत्वेन ब्रह्मविद्यायाः परविद्यात्वं निकृष्टसंसारफलत्वेन च कर्मविद्याया अपरविद्यात्वम् । ततः समाख्याबलादपरविद्याया मोक्षसाधनत्वाभावोऽवगम्यत इत्यभिप्रेत्याऽऽह –\n" +
  "परापरेति ।\n\n" +
  "यच्चाऽऽहुः कर्मजडाः केवलब्रह्मविद्यायाः कर्तृसंस्कारत्वेन कर्माङ्गत्वात्स्वातन्त्र्येण पुरुषार्थसाधनत्वं नास्तीति तदनन्तरश्रुत्यैव निराकृतमित्याह –\n" +
  "तथा परप्राप्तिसाधनमिति ।\n" +
  "ब्रह्मविद्यायाः कर्माङ्गत्वे कर्मणो निन्दा न स्यात् । न खल्वङ्गविधानाय प्रधानं विनिन्द्यते । अत्र तु सर्वसाध्यसाधननिन्दया तद्विषयवैराग्याभिधानपूर्वकं परप्राप्तिसाधनं ब्रह्मविद्यामाह – अतो ब्रह्मविद्यायाः स्वप्रधानत्वात्तत्प्रकाशकोपनिषदां न कर्तुः स्तावकत्वमित्यर्थः ।\n\n" +
  "यद्युपनिषदां स्वतन्त्रब्रह्मविद्याप्रकाशकत्वं स्यात्तर्हि तदध्येतॄणां सर्वेषामेव किमिति ब्रह्मविद्या न स्यादित्याशङ्क्याऽऽह –\n" +
  "गुरुप्रसादलभ्यामिति ।\n" +
  "गुर्वनुग्रहादिसंस्काराभावात्सर्वेषां यद्यपि न भविष्यति तथाऽपि विशिष्टाधिकारिणां भविष्यतीति भावः ।\n\n" +
  "ननु स्वतन्त्रा चेद्ब्रह्मविद्या तर्हि प्रयोजनसाधनं न स्यात् सुखदुःखप्राप्तिपरिहारयोः प्रवृत्तिनिवृत्तिसाध्यतावगमात्तत्राऽऽह –\n" +
  "प्रयोजनं चेति ।\n" +
  "स्मरणमात्रेण विस्मृतसुवर्णलाभे सुखप्राप्तिप्रसिद्धेः रज्जुतत्त्वज्ञानमात्राच्च सर्पजन्यभयकम्पादिदुःखनिवृत्तिप्रसिद्धेश्च न प्रवृत्तिनिवृत्तिसाध्यत्वं प्रयोजनस्यैकान्तिकम् । अतो विश्रब्धं श्रुतिः प्रयोजनसंबन्धं विद्याया असकृद्ब्रवीति । तस्मात्तत्प्रकाशकोपनिषदो व्याख्येयत्वं संभवतीत्यर्थः ।\n\n" +
  "यच्चाऽऽहुरेकदेशिनः स्वाध्यायाध्ययनविधेरर्थावबोधफलस्य त्रैवर्णिकाधिकारत्वादधीतोपनिषज्जन्ये ब्रह्मज्ञानेऽस्त्येव सर्वेषामधिकारः । ततः सर्वाश्रमकर्मसमुच्चितैव ब्रह्मविद्या मोक्षसाधनमिति तत्राऽऽह –\n" +
  "ज्ञानमात्र इति ।\n" +
  "सर्वस्वत्यागात्मकसंन्यासनिष्ठैव परब्रह्मविद्या मोक्षसाधनमिति वेदो दर्शयति । तादृशसंन्यासिनां च कर्मसाधनस्य स्वस्याभावान्न कर्मसम्भवः । आश्रमधर्मोऽपि शमदमाद्युपबृंहितविद्याभ्यासनिष्ठत्वमेव । तेषां शौचाचमनादिरपि तत्त्वतो नाऽऽश्रमधर्मो लोकसंग्रहार्थत्वात् । ज्ञानाभ्यासेनैवापावनत्वनिवृत्तेः । “न हि ज्ञानेन सदृशं पवित्रमिह विद्यते”(भ. गी. ४।३८) इति स्मरणात् । त्रिषवणस्नानविध्यादेरज्ञसंन्यासिविषयत्वात् । अतः कर्मनिवृत्त्यैव साहित्यं ज्ञानस्य न कर्मणेत्यर्थः ।\n\n" +
  "इतश्च न कर्मसमुच्चिता विद्या मोक्षसाधनमित्याह –\n" +
  "विद्याकर्मविरोधाच्चेति ।\n" +
  "अकर्तृ ब्रह्मैवास्मीति करोमि चेति स्फुटो व्याघात इत्यर्थः ।\n\n" +
  "यदा ब्रह्मात्मैकत्वं विस्मरति तदोत्पन्नविद्योऽपि करिष्यति ततः समुच्चयः संभाव्यत इति न वाच्यमित्याह –\n" +
  "विद्याया इति ।\n\n" +
  "ननु गृहस्थानामङ्गिरःप्रभृतीनां विद्यासंप्रदायप्रवर्तकत्वदर्शनाद्गृहस्थाश्रमकर्मभिः समुच्चयो लिङ्गादवगम्यत इत्याशङ्क्याऽऽह –\n" +
  "यत्त्विति ।\n" +
  "लिङ्गस्य न्यायोपबृंहितस्यैव गमकत्वाङ्गीकारात्समुच्चये च न्यायाभावात्प्रत्युत विरोधदर्शनान्न लिङ्गेन समुच्चयसिद्धिः । संप्रदायप्रवर्तकानां च गार्हस्थ्यस्याऽऽभासमात्रत्वात्तत्त्वानुसंधानेन मुहुर्मुहुर्बाधात् । “यस्य मे चास्ति सर्वत्र यस्य मे नास्ति किञ्चन । मिथिलायां प्रदीप्तायां न मे किञ्चन दह्यते ॥” इत्युद्गारदर्शनात्कर्माभासेन न समुच्चयः स्यात्तत्र च विधिर्न दृश्यत इति भावः ।\n\n" +
  "साधितं व्याख्येयत्वमुपसंहरति –\n" +
  "एवमिति ।\n\n" +
  "ग्रन्थे कथमुपनिषच्छब्दप्रयोग इति शङ्कायामुपनिषच्छब्दवाच्यविद्यार्थत्वाल्लाक्षणिक इति दर्शयितुं विद्याया उपनिषच्छब्दार्थत्वमाह –\n" +
  "य इमामिति ।\n" +
  "आत्मभावेनेति । प्रेमास्पदतयेत्यर्थः । अनर्थपूगं क्लेशसमूहं निशातयति शिथिलीकरोत्यपरिपक्वज्ञानाद्द्वित्रैर्जन्मभिर्मोक्षसंभवादित्यर्थः ।\n" +
  "“ज्ञानमप्रतिमं यस्य वैराग्यं च जगत्पतेः ।\n" +
  "ऐश्वर्यं चैव धर्मश्च सह सिद्धं चतुष्टयम् ॥” (वायुपुराणम् १।१।३)\n" +
  "इति स्मरणाद्धर्मज्ञानवैराग्यैश्वर्यैः सर्वानन्यानतिक्रम्य वर्तत इति परिवृढत्वं सिद्धमित्यर्थः ।\n" +
  "“योऽसावतीन्द्रियोऽग्राह्यः सूक्ष्मोऽव्यक्तः सनातनः ।\n" +
  "सर्वभूतमयोऽचिन्त्यः स एष स्वयमुद्बभौ ॥” (मनु. १-७)\n" +
  "“स्वयमुद्भूतः शुक्रशोणितसंयोगमन्तरेणाऽऽदिर्भूतः” इति स्मृतेः । स्वातन्त्र्यं गम्यते इत्यर्थः । वाक्योत्थबुद्धिवृत्त्यभिव्यक्तं ब्रह्मैव ब्रह्मविद्या ।\n\n" +
  "तच्च ब्रह्म सर्वाभिव्यञ्जकम् । ततः सर्वविद्यानां व्यञ्जकतयाऽऽश्रीयत इति सर्वविद्याश्रयाऽथवा सर्वविद्यानां प्रतिष्ठा परिसमाप्तिर्भवति यस्यामुत्पन्नायां ज्ञातव्याभावात्सा सर्वविद्याप्रतिष्ठेत्याह –\n" +
  "सर्वविद्यावेद्यं वेति ॥ १.१.१ ॥ १.१.२ ॥";

const MUNDAKA_1_1_3_4_TIKA =
  "प्रश्नबीजमाह –\n" +
  "एकस्मिन्निति ।\n\n" +
  "उपादानात्कार्यस्य पृथक्सत्त्वाभावादुपादाने ज्ञाते तत्कार्यं ततः पृथङ्नास्तीति ज्ञातं भवतीति सामान्यव्याप्तिस्तद्बलाद्वा पप्रच्छेत्याह –\n" +
  "अथवेति ।\n\n" +
  "प्रश्नाक्षराञ्जस्यमाक्षिप्य समाधत्ते –\n" +
  "नन्वविदिते हीत्यादिना ।\n" +
  "किमस्ति तदिति प्रयोगेऽक्षरबाहुल्येनाऽऽयासः स्यात्तद्भीरुतया कस्मिन्नित्यक्षराञ्जस्ये लाघवात्प्रश्न इत्यर्थः ॥ १.१.३ ॥ १.१.४ ॥";

const MUNDAKA_1_2_3_5_TIKA =
  "दर्शस्याग्निहोत्राङ्गत्वे प्रमाणाभावात्कथं तदकरणमग्निहोत्रस्य विपत्तिरित्याशङ्क्य यावज्जीवचोदनावशादग्निहोत्रिणोऽवश्यकर्तव्यत्वात्तदकरणं भवेद्विपत्तिरित्यभिप्रेत्य विशेषणम् । शरदादिषु नूतनान्नेन कर्तव्यमाग्रयणं कर्म । अदर्शादिवदवैश्वदेवमिति विशेषणम् । वैश्वदेवस्याग्निहोत्रानङ्गत्वेऽप्यावश्यकत्वादित्यर्थः । पिण्डोदकदानेन पित्रादीनां त्रयाणामुपकरोति यजमानः पुत्रादीनां च त्रयाणां ग्रासादिदानेन । ततो मध्यवर्तिना यजमानेन संबध्यमानाः पूर्वे त्रय उत्तरे च त्रयो गृह्यन्त इत्याह –\n" +
  "पिण्डदानादीति ॥ १.२.३ ॥ १.२.४ ॥ १.२.५ ॥";

const MUNDAKA_1_2_8_9_TIKA =
  "स्वयमेवेति तत्त्वदर्श्युपदेशानपेक्षतया स्वमनोरथेनैवेत्यर्थः ॥ १.२.८ ॥ १.२.९ ॥";

export const MUNDAKOPANISAD_ANANDAGIRI_PART1_TIKAS: Record<string, TikaEntry> = {
  "mundaka-1-1-1": {
    id: "tika-anandagiri-mundaka-1-1-1",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.1–2 & Upodghāta (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.१–२ व उपोद्घातः)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_1_1_2_TIKA,
    englishExplanation:
      "Opening with his maṅgala verse bowing to the imperishable Brahman, Ānandagiri explains why Muṇḍaka among Atharvavedic Upaniṣads is commented upon (for its utility in Brahmasūtra 1.2.21 'Adṛśyatvādi-guṇako dharmokteḥ'), defends the text's non-human authority (apauruṣeyatva) via beginningless guru-paramparā, refutes jñāna-karma-samuccaya using the incompatibility of 'I am non-agent Brahman' and 'I act', and clarifies the etymology of 'upaniṣad' and 'sarvavidyāpratiṣṭhā'.",
  },
  "mundaka-1-1-2": {
    id: "tika-anandagiri-mundaka-1-1-2",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.1–2 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.१–२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_1_1_2_TIKA,
    englishExplanation:
      "Grouped with Mantra 1.1.1, highlighting that the human teachers of Brahmavidyā are merely transmitters of an unbroken, beginningless lineage rather than authors, and addressing householder transmitters like Aṅgiras.",
  },
  "mundaka-1-1-3": {
    id: "tika-anandagiri-mundaka-1-1-3",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.3–4 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.३–४)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_1_3_4_TIKA,
    englishExplanation:
      "Ānandagiri identifies the seed of Śaunaka's question—the causal pervasion that knowing the material cause leaves no effect uncomprehended—and defends the grammatical economy ('lāghava') of asking 'kasmin nu vijñāte' rather than 'kim asti tat'.",
  },
  "mundaka-1-1-4": {
    id: "tika-anandagiri-mundaka-1-1-4",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.3–4 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.३–४)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_1_3_4_TIKA,
    englishExplanation:
      "Grouped with Mantra 1.1.3, completing the framing of Śaunaka's question prior to Aṅgiras's twofold division of Parā and Aparā Vidyā.",
  },
  "mundaka-1-1-5": {
    id: "tika-anandagiri-mundaka-1-1-5",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "कल्पः सूत्रग्रन्थः । अनुष्ठेयक्रमः कल्प इत्यर्थः । अविद्याया अपगम एव परप्राप्तिरुपचर्यते । अविद्यापगमश्च ब्रह्मावगतिरेवेति व्याख्यातमस्माभिर्ज्ञातोऽर्थस्तज्ज्ञप्तिर्वाऽविद्यानिवृत्तिरित्येतद्व्याख्यानावसरे । अतोऽधिगमशब्दोऽत्र प्राप्तिपर्याय एवेत्याह —\n" +
      "न च परप्राप्तेरिति ।\n\n" +
      "साङ्गानां वेदानामपरविद्यात्वेनोपन्यासात्ततः पृथक्करणाद्वेदबाह्यतया ब्रह्मविद्यायाः परत्वं न संभवतीत्याक्षिपति –\n" +
      "नन्विति ।\n" +
      "“या वेदबाह्याः स्मृतयो याश्च काश्च कुदृष्टयः । सर्वास्ता निष्फलाः प्रेत्य तमोनिष्ठा हि ताः स्मृताः”(मनु. १२-९५) इति स्मृतेः कुदृष्टित्वादनुपादेया स्यादित्यर्थः । विद्याया वेदबाह्यत्वे तदर्थानामुपनिषदामप्यृग्वेदादिबाह्यत्वं प्रसज्येतेत्यर्थः । वेदबाह्यत्वेन पृथक्करणं न भवति ।\n\n" +
      "किंतु वैदिकस्यापि ज्ञानस्य वस्तुविषयस्य शब्दराश्यतिरेकाभिप्रायेणेत्याह –\n" +
      "न वेद्यविषयेति ॥ १.१.५ ॥",
    englishExplanation:
      "Ānandagiri defines 'kalpa' as sūtra manuals of ritual order, explains why 'adhigama' (attainment of the Supreme) is identical with removal of avidyā, and resolves the objection that separating Parā Vidyā from the four Vedas would render Upaniṣads 'extra-Vedic'—noting the separation distinguishes object-oriented direct realization from mere textual mastery.",
  },
  "mundaka-1-1-6": {
    id: "tika-anandagiri-mundaka-1-1-6",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.6 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.६)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "कर्मज्ञानाद्विलक्षणत्वाभिप्रायेण च पृथक्करणमित्याह –\n" +
      "यथा विधिविषय इति ।\n\n" +
      "अप्राप्तप्रतिषेधप्रसङ्गान्न प्रधानपरत्वमपि शङ्कनीयमिति मत्वाऽऽह –\n" +
      "यः सर्वज्ञ इति ।\n\n" +
      "अगुणत्वादिति ।\n" +
      "उपसर्जनरहितत्वादित्यर्थः । सर्वात्मकत्वाच्चेति । हेयस्यातिरिक्तस्याभावाच्चेत्यर्थः ॥ १.१.६ ॥",
    englishExplanation:
      "Ānandagiri clarifies how Śaṅkara's opening distinguishes ritual injunction (where action follows comprehension) from Upaniṣadic knowledge (simultaneous with comprehension), rules out Sāṅkhya Pradhāna via 'sarvajña', and glosses 'aguṇatvāt' and 'sarvātmakatvāt' as explaining why Akṣara undergoes no diminution.",
  },
  "mundaka-1-1-7": {
    id: "tika-anandagiri-mundaka-1-1-7",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.7 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.७)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "ब्रह्म न कारणं सहायशून्यत्वात्कुलालमात्रवदित्यस्यानैकान्तिकत्वमुक्तमूर्णनाभिदृष्टान्तेन । ब्रह्म जगतो नोपादानं तदाभिन्नत्वात्स्वरूपस्येवेत्यनुमानान्तरस्यानैकान्तिकत्वमाह –\n" +
      "यथा च पृथिव्यामिति ।\n" +
      "जगन्न ब्रह्मोपादानकं तद्विलक्षणत्वात् । यद्यद्विलक्षणं तत्तदुपादानकं न भवति । यथा घटो न तन्तूपादानक इति ।\n\n" +
      "अस्य व्यभिचारार्थमाह –\n" +
      "यथा च सत इति ।\n\n" +
      "एकस्मिन्नपि दृष्टान्ते सर्वानुमानानामनैकान्तिकत्वं योजयितुं शक्यमिति शङ्कमानं प्रत्याह –\n" +
      "अनेकदृष्टान्तेति ॥ १.१.७ ॥",
    englishExplanation:
      "Ānandagiri formalizes the three analogies as Nyāya counter-examples refuting rival inferences: the spider refutes the demand for external accessories; herbs springing from earth refute non-difference precluding material causality; and insentient hair growing from a conscious person refutes the rule that material cause and effect must be homogeneous.",
  },
  "mundaka-1-1-8": {
    id: "tika-anandagiri-mundaka-1-1-8",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.8 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.८)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "ईश्वरत्वोपाधिभूतं मायातत्त्वं महाभूतादिरूपेण सर्वजीवैरुपलभ्यत इति सर्वसाधारण्येऽपि कथं जायतेऽनादिसिद्धत्वादित्याशङ्क्याऽऽह –\n" +
      "व्याचिकीर्षितेति ।\n" +
      "कर्मापूर्वसमवायिभूतं सूक्ष्ममव्याकृतमिति केचित् । तन्न तस्य प्रतिजीवं भिन्नत्वादीश्वरत्वोपाधित्वासंभवात् । सामान्यरूपेण संभवेऽपि पृथिव्यादिसामान्यानां बहुत्वात् । प्रकृतावेकत्वश्रुतिव्याकोपापाताज्जाड्यमहामायारूपेणैकत्वसंभवेऽपि न कर्मापूर्वसमवायित्वम् । तस्याकारकत्वाद्बुद्ध्यादीनामेव कारकत्वाभिधानात् । कारकावयवेष्वेव क्रियासमवायाभ्युपगमात् ।\n\n" +
      "किंच न कार्यस्य स्वकारणप्रकृतित्वं दृष्टमिति भूतसूक्ष्मस्यापञ्चीकृतभूतप्रकृतित्वं न स्यात् । तस्मान्महाभूतसर्गादिसंस्कारास्पदं गुणत्रयसाम्यं मायातत्त्वमव्याकृतादिशब्दवाच्यमिहाभ्युपगन्तव्यम् । पूर्वस्मिन्कल्पे हिरण्यगर्भप्राप्तिनिमित्तं प्रकृष्टं ज्ञानं कर्म च येनानुष्ठितं तदनुग्रहाय मायोपाधिकं ब्रह्म हिरण्यगर्भावस्थाकारेण विवर्तते । स च जीवस्तदवस्थाभिमानी हिरण्यगर्भ उच्यत इत्यभिप्रेत्याऽऽह –\n" +
      "ब्रह्मण इति ।\n" +
      "ज्ञानशक्तिभिः क्रियाशक्तिभिश्चाधिष्ठितं विशिष्टं जगद्व्यष्टिरूपं तस्य साधारणः समष्टिरूपः सूत्रसंज्ञक इत्यर्थः । मनआख्यमिति समष्टिरूपं विवक्षितम् । व्यष्टिरूपस्य लोकसृष्ट्युत्तरकालत्वात् ॥ १.१.८ ॥",
    englishExplanation:
      "Ānandagiri conducts a rigorous metaphysical analysis of 'annam' (the unmanifest Māyā-principle as equilibrium of the three guṇas, rejecting attempts to identify it with individual subtle elements or karma-apūrva) and clarifies how Brahman conditioned by Māyā manifests as cosmic Hiraṇyagarbha ('brahmaṇo manākhyam' in its collective cosmic aspect prior to individual world-creation).",
  },
  "mundaka-1-1-9": {
    id: "tika-anandagiri-mundaka-1-1-9",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.1.9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.१.९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "वक्ष्यमाणार्थमिति ।\n" +
      "वक्ष्यमाणस्याविद्याविवरणप्रकरणस्याऽऽरम्भार्थमुक्तपरविद्यासूत्रार्थोपसंहार इत्यर्थः ।\n\n" +
      "सामान्येनेति ।\n" +
      "समष्टिरूपेण मायाख्येनोपाधिनेत्यर्थः ।\n\n" +
      "विशेषेणेति ।\n" +
      "व्यष्टिरूपेणाविद्याख्येनोपाधिनाऽनन्तजीवभावमापन्नः स एव सर्वं स्वोपाधितत्संसृष्टं च वेत्तीत्यधिदैवमध्यात्मं च तत्त्वाभेदः सूत्रितः । स्रष्टृत्वं प्रजापतीनां तपसा प्रसिद्धम् । तद्वद्ब्रह्मणोऽपि स्रष्टृत्वे तपोऽनुष्ठानं वक्तव्यम् ।\n\n" +
      "ततः संसारित्वं प्रसज्येतेत्याशङ्क्याऽऽह –\n" +
      "यस्य ज्ञानमयमिति ।\n" +
      "सत्त्वप्रधानमायाया ज्ञानाख्यो विकारस्तदुपाधिकं ज्ञानविकारं सृज्यमानसर्वपदार्थाभिज्ञत्वलक्षणं तपो न तु क्लेशरूपं प्रजापतीनामित्यर्थः ॥ १.१.९ ॥\n" +
      "इति मुण्डकोपनिषद्भाष्यटीकायां प्रथममुण्डके प्रथमः खण्डः ॥ १.१ ॥",
    englishExplanation:
      "Ānandagiri explains 'sāmānyena' and 'viśeṣeṇa' in the Bhāṣya as referring respectively to the cosmic Māyā-adjunct (Īśvara) and individual avidyā-adjuncts (jīvas), and clarifies that Brahman's 'jñānamayaṁ tapaḥ' is effortless omniscience conditioned by sattva-predominant Māyā rather than painful austerity like that of Prajāpatis.",
  },
  "mundaka-1-2-1": {
    id: "tika-anandagiri-mundaka-1-2-1",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.1 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.१)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "अनादिरुपादानरूपेणानन्तो ब्रह्मज्ञानात्प्रागन्तासंभवात्प्रत्येकं शरीरिभिर्हातव्यो दुःखरूपत्वादित्यनेन यदाहुरेकजीववादिन एकं चैतन्यमेकयैवाविद्यया बद्धं संसरति । तदेव कदाचिन्मुच्यते नास्मदादीनां बन्धमोक्षौ स्त इति तदपास्तं भवति । श्रुतिबहिष्कृतत्वात् । सुषुप्तेऽपि क्रियाकारकफलभेदस्य प्रहाणं भवति । बुद्धिपूर्वकप्रहाणस्य ततो विशेषमाह –\n" +
      "सामस्त्येनेति ।\n" +
      "स्वोपाध्यविद्याकार्यस्याविद्याप्रहाणेऽऽत्यन्तिकप्रहाणं विद्याफलमित्यर्थः । अमरोऽपक्षयरहितः । अमृतो नाशरहित इत्यर्थः ।\n\n" +
      "अपरविद्यायाः परविद्यायाश्च विषयौ प्रदर्श्य पूर्वमपरविद्याया विषयप्रदर्शने श्रुतेरभिप्रायमाह –\n" +
      "पूर्वं तावदिति ।\n\n" +
      "यदिष्टसाधनतयाऽनिष्टसाधनतया वा वेदेन बोध्यते कर्म तस्यासति प्रतिबन्धे तत्साधनत्वाव्यभिचारः सत्यत्वं न स्वरूपाबाध्यत्वं 'प्लवा ह्येत' इत्यादिना निन्दितत्वात्स्वरूपबाध्यत्वेऽपि चार्थक्रियासामर्थ्यं स्वप्नकामिन्यामिव घटत इत्यभिप्रेत्याऽऽह –\n" +
      "तदेतत्सत्यमिति ।\n" +
      "ऋग्वेदविहितः पदार्थो हौत्रम् । यजुर्वेदविहित आध्वर्यवम् । सामवेदविहित औद्गात्रम् । तद्रूपायां त्रेतायामित्यर्थः । सत्यकामा मोक्षकामा इति समुच्चयाभिप्रायेण व्याख्यानमयुक्तम् । ’एष वः पन्थाः सुकृतस्य लोके’ इति स्वर्ग्यफलसाधनत्वविषयवाक्यशेषविरोधादिति ॥ १.२.१ ॥",
    englishExplanation:
      "Ānandagiri notes how Śaṅkara's phrase 'pratyekaṁ śarīribhir hātavyaḥ' refutes the strict ekajīvavāda claim that only one jīva is bound and released; distinguishes deep sleep from final eradication of avidyā ('sāmastyena'); and explains why Vedic rituals are called 'satyam' only in the sense of unfailing empirical efficacy (like a dream-experience), rejecting interpretations of 'satyakāmāḥ' as liberation-seekers combining karma and knowledge.",
  },
  "mundaka-1-2-2": {
    id: "tika-anandagiri-mundaka-1-2-2",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.2 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "आहवनीयस्य दक्षिणोत्तरपार्श्वयोराज्यभागाविज्येते अग्नये स्वाहा सोमाय स्वाहेति दर्शपूर्णमासे । तयोर्मध्येऽन्ये यागा अनुष्ठीयन्ते । तन्मध्यमावापस्थानमुच्यते । अग्निहोत्राहुत्योर्द्वित्वं प्रसिद्धम् । सूर्याय स्वाहा प्रजापतये स्वाहेति प्रातः । अग्नये स्वाहा प्रजापतये स्वाहेति सायम् । तत्कथमग्निहोत्रं प्रक्रम्याऽऽहुतीरिति बहुवचनं तत्राऽऽह –\n" +
      "अनेकाहेति ।\n" +
      "अनेकेष्वहःसु प्रयोगानुष्ठानानि तदपेक्षयेत्यर्थः ॥ १.२.२ ॥",
    englishExplanation:
      "Ānandagiri details the ritual positioning of the two ājya-bhāga oblations and the intervening āvāpa offerings in Darśapūrṇamāsa, and explains why the plural 'āhutīḥ' is used despite Agnihotra having only two daily oblations (morning and evening)—because it refers to performances across many days.",
  },
  "mundaka-1-2-3": {
    id: "tika-anandagiri-mundaka-1-2-3",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.3–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.३–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_2_3_5_TIKA,
    englishExplanation:
      "Ānandagiri explains why neglecting Darśa-Pūrṇamāsa, Āgrayaṇa (first-fruits offering), or Vaiśvadeva ruins the Agnihotrin's sacrifice—even though not strictly subsidiary to Agnihotra, they are obligatory under lifelong injunctions—and clarifies the seven worlds ('āsaptamān') via offerings to three ancestors and three descendants centered on the sacrificer.",
  },
  "mundaka-1-2-4": {
    id: "tika-anandagiri-mundaka-1-2-4",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.3–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.३–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_2_3_5_TIKA,
    englishExplanation:
      "Grouped with Mantras 1.2.3–5, encompassing the seven tongues of fire in the Agnihotra ritual framework.",
  },
  "mundaka-1-2-5": {
    id: "tika-anandagiri-mundaka-1-2-5",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.3–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.३–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_2_3_5_TIKA,
    englishExplanation:
      "Grouped with Mantras 1.2.3–5, completing the treatment of timely oblations into the seven flickering tongues of Agni leading the yajamāna upward.",
  },
  "mundaka-1-2-6": {
    id: "tika-anandagiri-mundaka-1-2-6",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.6 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.६)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: "आहुतयो यजमानं वहन्तीति संबन्धः ॥ १.२.६ ॥",
    englishExplanation:
      "Ānandagiri briefly notes the syntactic subject-object link in Mantra 1.2.6: it is the oblations ('āhutayaḥ') that convey the sacrificer along the solar rays to heaven.",
  },
  "mundaka-1-2-7": {
    id: "tika-anandagiri-mundaka-1-2-7",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.7 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.७)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: "रूप्यते निरूप्यते यदाश्रयतया यज्ञस्ते यज्ञरूपाः ॥ १.२.७ ॥",
    englishExplanation:
      "Ānandagiri derives 'yajñarūpāḥ' as those eighteen ritual constituents (the sixteen priests plus sacrificer and wife) on whose support the sacrifice is delineated.",
  },
  "mundaka-1-2-8": {
    id: "tika-anandagiri-mundaka-1-2-8",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.8–9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.८–९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_2_8_9_TIKA,
    englishExplanation:
      "Ānandagiri glosses 'svayam eva' in Śaṅkara's Bhāṣya as meaning 'according to their own wishful fancy, without relying on instruction from a knower of truth'.",
  },
  "mundaka-1-2-9": {
    id: "tika-anandagiri-mundaka-1-2-9",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.8–9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.८–९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_1_2_8_9_TIKA,
    englishExplanation:
      "Grouped with Mantra 1.2.8, continuing the critique of ritualists who remain attached to karmic fruits and fall back when merit is exhausted.",
  },
  "mundaka-1-2-10": {
    id: "tika-anandagiri-mundaka-1-2-10",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.10 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.१०)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: "कं सुखं न भवतीत्यकं दुःखं तन्न विद्यते यस्मिन्नसौ नाकः ॥ १.२.१० ॥",
    englishExplanation:
      "Ānandagiri provides the classical nirukti derivation of 'nāka' (heaven): 'ka' = happiness; 'aka' = absence of happiness (sorrow); 'nāka' = that celestial state where sorrow does not exist.",
  },
  "mundaka-1-2-11": {
    id: "tika-anandagiri-mundaka-1-2-11",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.11 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.११)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "केवलकर्मिणां फलमुक्त्वा सगुणब्रह्मज्ञानसहिताश्रमकर्मिणां फलं संसारगोचरमेव दर्शयति –\n" +
      "ये पुनस्तद्विपरीता ज्ञानयुक्ता इत्यादिना ।\n" +
      "अरण्ये स्त्रीजनासंकीर्णे देशे ।\n\n" +
      "मुक्तानामिहैव सर्वकामप्रविलयं सर्वात्मभावं च दर्शयन्ति श्रुतयः । ब्रह्मलोकप्राप्तिस्तु देशपरिच्छिन्नं फलं ततो न मोक्ष इत्याह –\n" +
      "इहैवेति ।\n" +
      "ब्रह्मा चतुर्मुखः । विश्वसृजः प्रजापतयो मरीचिप्रभृतयः । धर्मो यमः । महान्सूत्रात्मा । अव्यक्तं त्रिगुणात्मिका प्रकृतिः । सात्त्विकीं सत्त्वपरिणामज्ञानसहितकर्मफलभूतामित्यर्थः ॥ १.२.११ ॥",
    englishExplanation:
      "Ānandagiri distinguishes the mere ritualists (1.2.10) from forest-dwelling meditators combining saguṇa meditation with stage-of-life duties: their attainment of Brahmaloka via the northern solar path still falls within spatial limitation and saṁsāra, unlike true liberation here and now. He also identifies the cosmic principles in Śaṅkara's gloss (four-faced Brahmā, Marīci etc., Yama, Sūtrātmā, Avyakta).",
  },
  "mundaka-1-2-12": {
    id: "tika-anandagiri-mundaka-1-2-12",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.12 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.१२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "ऐहिककर्मफलस्य पुत्रादेर्नाशविषयं प्रत्यक्षं विमतमनित्यं कृतकत्वाद्घटवदित्यनुमानमामुष्मिकनाशविषयम् । तद्यथेह कर्मचितो लोकः क्षीयत इत्याद्यागमास्तैरनित्यत्वेन सर्वात्मनाऽवधार्येत्यर्थः ।\n" +
      "“नैतादृशं ब्राह्मणस्यास्ति वित्तं यथैकता समता सत्यता च ।\n" +
      "शीलं स्थितिर्दण्डनिधानमार्जवं ततस्ततश्चोपरमः क्रियाभ्यः ॥” (पुत्रगीता-३७)\n" +
      "इति स्मृतेर्ब्राह्मणस्यैवाधिकार इत्यर्थः । कूटस्थेन परिणामरहितेनाचलेन स्पन्दरहितेन ध्रुवेण प्रयत्नरहितेनाहमर्थी । समित्पाणिरिति विनयोपलक्षणम् ॥ १.२.१२ ॥",
    englishExplanation:
      "Ānandagiri shows how 'parīkṣya lokān' engages all three pramāṇas—perception for worldly impermanence, inference ('produced, therefore non-eternal like a pot') for otherworldly realms, and scripture ('karmacito lokaḥ kṣīyate')—and cites Putragītā on the Brāhmaṇa's distinctive qualification for renunciation, glossing 'kūṭastha', 'acala', 'dhruva', and 'samitpāṇi'.",
  },
  "mundaka-1-2-13": {
    id: "tika-anandagiri-mundaka-1-2-13",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 1.2.13 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (१.२.१३)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "अक्षरणादिति ।\n" +
      "अवयवान्यथाभावलक्षणपरिणामशून्यत्वात् ।\n\n" +
      "अक्षतत्वादिति ।\n" +
      "अक्षयत्वाच्चेति । अशरीरत्वाद्विकारशून्यत्वादित्यर्थः ॥ १३ ॥\n" +
      "इति मुण्डकोपनिषद्भाष्यटीकायां प्रथममुण्डके द्वितीयः खण्डः ॥ १.२ ॥\n" +
      "इत्यथर्ववेदीयमुण्डकोपनिषद्भाष्यटीकायां प्रथममुण्डकं समाप्तम् ॥ १ ॥",
    englishExplanation:
      "Ānandagiri clarifies the threefold etymology of 'Akṣara' given in the Bhāṣya—free from part-wise transformation ('akṣaraṇāt'), free from injury/diminution ('akṣatatvāt'), and bodilessly immutable ('akṣayatvāt')—closing the First Muṇḍaka.",
  },
};
