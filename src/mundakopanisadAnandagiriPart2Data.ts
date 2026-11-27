import { TikaEntry } from "./types";

const MUNDAKA_2_1_4_5_TIKA =
  "सर्वेषां भूतानामिति ।\n" +
  "पञ्चमहाभूतानाम् । अन्तरात्मा स्थूलपञ्चभूतशरीरो हि विराडित्यर्थः । पञ्चाग्निद्वारेण । द्युपर्जन्यपृथिवीपुरुषयोषित्सु पञ्चस्वग्निदृष्टेः श्रुत्यन्तरचोदितत्वात्तद्द्वारेणेत्यर्थः ॥ २.१.४ ॥ २.१.५ ॥";

const MUNDAKA_2_1_9_10_TIKA =
  "यत्पृष्टं कस्मिन्नु भगवो विज्ञाते सर्वमिदं विज्ञातं भवतीति तन्निरूपितम् । सर्वमिदं परमात्मनो जायते । अतस्तावन्मात्रं सर्वं तस्मिन्विज्ञाते विज्ञातं भवतीत्यविद्याक्षयफलाभिधानेनोपसंहृतमिति ॥ २.१.९ ॥ २.१.१० ॥\n" +
  "इति मुण्डकोपनिषद्भाष्यटीकायां द्वितीयमुण्डके प्रथमः खण्डः ॥ २.१ ॥";

const MUNDAKA_2_2_3_4_TIKA =
  "विचारासमर्थस्य प्रणवमवलम्ब्य ब्रह्मात्मैकत्वे चित्तसमाधानं क्रममुक्तिफलं दर्शयितुमुपक्रमते –\n" +
  "कथं वेद्धव्यमित्यादिना ।\n" +
  "प्रणवो ब्रह्मेत्यभिध्यायत उपसंहृतकरणग्रामस्य प्रणवोपरक्तं यच्चैतन्यप्रतिबिम्बं स्फुरति स आत्मेत्यनुसन्धानं प्रणवे शरसन्धानं तस्य चित्प्रतिबिम्बस्य बिम्बैक्यानुसन्धानं लक्ष्यवेधः ॥ २.२.३ ॥ २.२.४ ॥";

const MUNDAKA_2_2_7_8_TIKA =
  "सर्वेश्वरत्वमनोमयत्वादिगुणविशिष्टब्रह्मणो हृदयपुण्डरीके ध्यानं च क्रममुक्तिफलं मन्दब्रह्मविदो विधीयत इति दर्शयितुमाह –\n" +
  "योऽसौ तमसः परस्तादित्यादिना ॥ २.२.७ ॥";

const MUNDAKA_2_2_9_10_TIKA =
  "अस्य परमात्मज्ञानस्येति ।\n" +
  "जीवन्मुक्तिफलस्याद्वैतवाक्यार्थावगमस्य क्रममुक्तिफलस्य चोपासनस्येत्यर्थ: । अविद्यावासनाप्रचयो भिद्यत इति कोऽर्थ: । किं बुद्धौ विद्यमानायामविद्यादिभेदो ज्ञानफलं किंवा तन्निवृत्तौ । नाऽऽद्यः । सत्युपादाने कार्यस्यात्यन्तोच्छेदासंभवात् । न द्वितीयः । ज्ञानस्याज्ञानेनैव साक्षाद्विरोधप्रसिद्धेः । किञ्च । बुद्धिरप्यनादिः सादिर्वा । नाऽऽद्यः । “एतस्माज्जायते प्राणो मनः सर्वेन्द्रियाणि च”(मु. उ. २ । १ । ३) इति श्रुतिविरोधात् । नान्त्यः । प्रलये ब्रह्मज्ञानं विनैव बुद्धेर्नाशसंभवात्तदानर्थक्यप्रसङ्गात् । सादित्वे च बुद्धेरुपादानं साक्षाद्ब्रह्म चेत्तन्नाशं विनाऽत्यन्तोच्छेदो न स्यात् । माया चेत्सा दृष्टगतज्ञानेन नोच्छेदमर्हति । लौकिकमायाविगतमायाया द्रष्टृगतज्ञानेनोच्छेदादर्शनात् । किञ्च । बुद्धेरुच्छेदो न तस्याः फलं स्वनाशस्याफलत्वात् । नाऽऽत्मनः । तस्य बुद्धिप्रसङ्गाभावेन तदुच्छेदस्याफलत्वात् । किञ्चाऽऽत्मनोऽविद्याद्यनाश्रयत्वाभिधानं श्रुतिविरुद्धं प्रक्रमे– अविद्यायामन्तरे वर्तमाना इति श्रवणादुपसंहारे च – “अनीशया शोचति मुह्यमानः”(मु. उ. ३ । १ । २) इति श्रवणात् । बुद्धिगतमेवाविद्याद्यात्मन्यध्यस्यत इति चेदध्यस्यत इति कोऽर्थः । निक्षिप्यते भ्रान्त्या दृश्यते वा । नाऽऽद्यः । अन्यधर्मस्यान्यत्र निक्षेपासम्भवात् । भ्रान्त्या चेत्केन दृश्यते । न तावदात्मना तस्याविद्याश्रयत्वानङ्गीकारात् । न बुद्ध्या । बुद्धेरात्मविषयत्वासम्भवेन तद्गतदर्शनासम्भवात् । तद्भ्रान्तेश्च स्वाश्रयगतेन तत्त्वानुभवेन निवर्त्यत्वप्रसिद्धेर्बुद्धेरनुभवाश्रयत्वप्रसङ्गात् । तस्मान्नास्य भाष्यस्य सम्यगर्थं पश्याम इति चेदुच्यते । चित्तन्त्राऽनादिरनिर्वाच्याऽविद्या चैतन्यमवच्छिद्य स्वावच्छिन्नचैतन्यस्य बुद्ध्यादितादात्म्यरूपेण विवर्तते । तस्याश्च ब्रह्मात्मतासाक्षात्कारनिवर्त्यरूपाङ्गीकारात्तन्निवृत्तौ तदुत्थहृदयग्रन्थिभेदः श्रुत्योच्यते । भाष्यकारीयं च बुद्ध्याश्रयत्वाभिधानमहङ्कारविशेषणत्वेनाविद्यादेर्व्यावहारिकाभिप्रायेणाऽऽत्मानाश्रयत्वाभिधानं चाऽऽत्मनो निर्विकारत्वाभिप्रायम् । बाधितानुवृत्तिश्च प्रकटार्थे प्रादर्शीति जीवन्मुक्तिर्न विरुध्यते ॥ २.२.८ ॥ २.२.९ ॥";

const MUNDAKA_3_1_2_3_TIKA =
  "आवरणं विक्षेपश्च द्वयमविद्यायाः कार्यम् । तत्रेश्वरभावाप्रतिपत्तिरनीशावरणं शोचतीति विक्षेपस्तदुभयहेतुरनिर्वाच्यमज्ञानं मोहः तेन विशिष्टोऽनेकैरनर्थप्रकारैरहं करोमीत्यादिभिरविवेकतया तादात्म्यापन्नतयेत्यर्थः । आजवमनवरतं जवीभावं निकृष्टभावं लक्षणया लघुभावं कर्मवायुप्रेरिततया जवीभावं क्षैप्र्यमापन्नः पूर्ववदित्यभेदेनेत्यर्थः ॥ ३.१.२ ॥ ३.१.३ ॥";

const MUNDAKA_3_2_4_5_TIKA =
  "वीर्यमत्र मिथ्याज्ञानानभिभाव्यतालक्षणोऽतिशयः । अलिङ्गादिति कथम्? इन्द्रजनकगार्गीप्रभृतीनामप्यात्मलाभश्रवणात् । सत्यम् । संन्यासो नाम सर्वत्यागात्मकस्तेषामपि स्वत्वाभिमानाभावादस्त्येवाऽऽन्तरः संन्यासो बाह्यं तु लिङ्गमविवक्षितम् ॥ “न लिङ्गं धर्मकारणम्”(मनु. ६-६६) इति स्मरणात् नैष्कर्म्यसाहित्यं तु विवक्षितम् ॥ ३.२.४ ॥ ३.२.५ ॥";

const MUNDAKA_3_2_7_9_TIKA =
  "स्वाः प्रतिष्ठाः प्रति गता भवन्तीति भूतांशानां भौतिकानां च महाभूतेषु लयो दर्शितः ।\n" +
  "अन्त्यप्रश्नेति ।\n" +
  "ब्राह्मणग्रन्थे षष्ठप्रश्ने प्राणाद्या याः कलाः पठिता इत्यर्थः । मायामयमहाभूतानामंशावष्टब्धैर्जीवाविद्यामयभूतसूक्ष्मैः प्रातिस्विकैरदृष्टसहकृतैः प्रातिस्विकाः प्राणादय आरभ्यन्ते । ते च कर्माक्षिप्तैर्देवैः सूर्यादिभिरधिष्ठीयन्ते । कर्मणो भोगेनावसाने ते देवाः । स्वस्थानं गच्छन्ति ।\n\n" +
  "यच्च प्रातिस्विकं स्वाविद्याकार्यं तच्च सर्वं ब्रह्मैव संपद्यत इत्याह –\n" +
  "यानि चेत्यादिना ॥ ३.२.७ ॥ ३.२.८ ॥ ३.२.९ ॥";

const MUNDAKA_3_2_10_11_TIKA =
  "एतद्ग्रन्थद्वारकविद्याप्रदानेऽयं विधिराथर्वणिकानामिति प्रकृतपरामर्शकादेतच्छब्दादवगम्यते ग्रन्थद्वारेण विद्यायाः प्रकृतत्वसम्भवान्न सर्वत्र ब्रह्मविद्यासंप्रदानमिति सूचयन्नाह –\n" +
  "एतां ब्रह्मविद्यां वदेतेति ॥ ३.२.१० ॥ ३.२.११ ॥\n" +
  "इत्यथर्ववेदीयमुण्डकोपनिषद्भाष्यटीकायां तृतीयमुण्डके द्वितीयः खण्डः ॥ ३.२ ॥\n" +
  "इत्यथर्ववेदीयमुण्डकोपनिषद्भाष्यटीकायां तृतीयं मुण्डकं समाप्तम् ॥ ३ ॥";

export const MUNDAKOPANISAD_ANANDAGIRI_PART2_TIKAS: Record<string, TikaEntry> = {
  "mundaka-2-1-1": {
    id: "tika-anandagiri-mundaka-2-1-1",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.1 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.१)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "द्वितीयं मुण्डकम्: प्रथमः खण्डः\n\n" +
      "द्वे विद्ये वेदितव्ये इत्युपन्यस्यापरविद्यामाद्यमुण्डकेन प्रपञ्च्य परविद्यां सूत्रितां प्रपञ्चयितुं द्वितीयमुण्डकारम्भ इत्याह –\n" +
      "अपरविद्याया इत्यादिना ।\n\n" +
      "कर्मणोऽपि प्राक्सत्यत्वमुक्तं तद्वदिदं सत्यत्वं न मन्तव्यमित्याह –\n" +
      "यदपरविद्याविषयमिति ।\n" +
      "विषीयते विशेष्यते विद्याऽनेनेति व्युत्पत्त्या विषयशब्दस्य वस्तुपरत्वान्नपुंसकलिङ्गत्वं परमार्थतः सल्लक्षणत्वादत्यन्ताबाध्यत्वादित्यर्थः ।\n\n" +
      "अत्यन्तपरोक्षत्वादिति ।\n" +
      "शास्त्रैकगम्यत्वात् ।\n\n" +
      "अपूर्ववद्ब्रह्मणः प्रत्यक्षत्वं न सम्भवति साक्षात्काराधीनं च कैवल्यं ततः कथं नाम सत्यमक्षरं प्रत्यक्षवत्प्रतिपद्येरन्मुमुक्षव इत्यभिप्रेत्य जीवब्रह्मणोरेकत्वे दृष्टान्तमाह –\n" +
      "यथा सुदीप्तादिति ।\n" +
      "एकत्वे सति प्रत्यग्रूपस्यापरोक्षत्वाद्ब्रह्मणोऽपि प्रत्यक्षत्वं भविष्यति घटैकदेशप्रत्यक्षत्वे घटप्रत्यक्षवदित्यर्थः । यथा विभक्तदेशावच्छिन्नत्वेन विस्फुलिङ्गेष्ववयवत्वादिव्यवहारः स्वतः पुनरग्न्यात्मत्वमेवोष्णप्रकाशत्वाविशेषात्तथा चिद्रूपत्वाविशेषाज्जीवानां स्वतो ब्रह्मत्वमेवेत्यर्थः ॥ २.१.१ ॥",
    englishExplanation:
      "Ānandagiri introduces the Second Muṇḍaka as the detailed exposition of Parā Vidyā after the First Muṇḍaka's critique of Aparā Vidyā; explains the neuter 'yad aparavidyā-viṣayam' and absolute unsublatability of Akṣara; and unpacks the fire-sparks simile to show why the transcendent Self can yet be directly realized—because all jīvas are inherently pure Consciousness identical with Brahman, like sparks sharing fire's heat and light.",
  },
  "mundaka-2-1-2": {
    id: "tika-anandagiri-mundaka-2-1-2",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.2 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "अक्षरस्यापि जीवोत्पत्तिप्रलयनिमित्तत्वमौपाधिकमुक्तमेकत्वसिद्ध्यर्थम् । तत्त्वतस्तु निमित्तनैमित्तिकभावोऽपि नास्तीत्याह –\n" +
      "नामरूपबीजभूतादिति ।\n" +
      "देहापेक्षया यद्बाह्यमान्तरं च प्रसिद्धं तेन सह तत्तादात्म्येन तदधिष्ठानतया वा वर्तत इति सबाह्याभ्यन्तरः । अत एव सर्वात्मत्वाद्व्यतिरिक्तनिमित्तभावादज इत्यर्थः ।\n\n" +
      "जायतेऽस्ति वर्धते विपरिणमतेऽपक्षीयते विनश्यतीत्येवमादिभावविकाराणां निषेधे तात्पर्यमजशब्दस्याऽऽह –\n" +
      "सर्वभावविकाराणामिति ।\n\n" +
      "जीवानां प्राणादिमत्त्वात्तदात्मत्वे ब्रह्मणोऽपि प्राणादिमत्त्वं प्राप्तं तन्निवर्तयति –\n" +
      "यद्यपीत्यादिना ।\n" +
      "स्मृतिसंशयाद्यनेकज्ञानेषु शक्तिविशेषोऽस्यास्तीति तथोक्तं नामरूपयोर्बीजं ब्रह्म तस्योपाधितया लक्षितं शुद्धस्य कारणत्वानुपपत्त्या गमितं स्वरूपमस्येति तथोक्तम् ।\n\n" +
      "तस्मादुपाधिरूपात्तद्विशिष्टरूपाच्च परतोऽक्षरात्पर इति सम्बन्धः कथं मायातत्त्वस्याक्षरस्य परत्वमित्याकाङ्क्षायामाह –\n" +
      "सर्वकार्येति ।\n" +
      "कार्यं ह्यपरं प्रसिद्धम् तत्कारणत्वेन गम्यमानत्वान्मायातत्त्वं परम् । यौक्तिकबाधादनिर्वाच्यत्वेऽपि स्वरूपोच्छेदाभावादक्षरम् । तदुक्तं गीतायाम् –\n" +
      "“क्षरः सर्वाणि भूतानि कूटस्थोऽक्षर उच्यते ।\n" +
      "उत्तमः पुरुषस्त्वन्यः परमात्मेत्युदाहृतः”(भ. गी. १५ । १६) इति ॥ २.१.२ ॥",
    englishExplanation:
      "Ānandagiri clarifies that even causality attributed to Akṣara is purely upādhi-based (not real cause-effect duality), glosses 'sabāhyābhyantaraḥ' and 'ajaḥ' (negating all six bhāva-vikāras), and reconciles 'akṣarāt parataḥ paraḥ' by citing Bhagavadgītā 15.16–17: Māyā (unmanifest seed of name and form) is 'akṣara' relative to transient effects, while the pure Puruṣa transcends even that Māyā-akṣara.",
  },
  "mundaka-2-1-3": {
    id: "tika-anandagiri-mundaka-2-1-3",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.3 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.३)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "यदेव चैतन्यं निरुपाधिकं शुद्धमविकल्पं ब्रह्म यत्तत्त्वज्ञानाज्जीवानां कैवल्यं तदेव मायाप्रतिबिम्बितरूपेण कारणं भवतीत्याह –\n" +
      "यस्मादेतस्मादेवेति ।\n\n" +
      "प्राणोत्पत्तेरूर्ध्वं तर्हि सप्राणत्त्वं परमात्मनो भविष्यतीति शङ्कानिवृत्त्यर्थं श्रुत्यन्तरप्रसिद्धं प्राणस्य विशेषणमाह –\n" +
      "अविद्याविषय इति ।\n\n" +
      "नामधेय इति ।\n" +
      "वाङ्मात्रो न वस्तुवृत्त इत्यर्थः । प्राणादीनां पाठक्रमोऽयमर्थक्रमेण बाध्यते । “गताः कलाः पञ्चदश प्रतिष्ठाः”(मु. उ. ३ । २ । ७) इति भूतेषु लयश्रवणेन प्राणानां भौतिकत्वावगमाद्भूतोत्पत्त्यनन्तरं प्राणोत्पत्तिर्द्रष्टव्येति । अभिमुखमागच्छन्वायुरावहः पुरतो गच्छन्प्रवह इत्यादिभेदः । शब्दस्पर्शरूपरसगन्धा उत्तरोत्तरस्य गुणा येषां तानि तथोक्तानि । यथा शुक्लतन्त्ववस्थापन्नादन्वयिकारणाज्जायमानः पटः शुक्लगुणो जायते तथाऽऽकाशावस्थापन्नाद्ब्रह्मणो जायमानो वायुराकाशगुणेन शब्देनान्वितो जायते । तथैव वायुभावापन्नाद्ब्रह्मणोऽग्निस्तद्गुणेनान्वितो जायत इति द्रष्टव्यम् । ननु सूक्ष्माणि भूतानि प्रथममुत्पद्यन्ते । अनन्तरं तासां त्रिवृतं त्रिवृतमेकैकामकरोदिति पञ्चीकरणोपलक्षणार्थं त्रिवृत्करणश्रुतेः पञ्चात्मकत्वमवगम्यते । तत एकैकस्य भूतस्य पञ्चगुणवत्त्वं वर्णितमन्यत्र कथमिह पञ्चीकरणमनादृत्य प्रथमसर्ग एवाऽऽकाशस्यैकगुणत्वं वायोर्हि द्विगुणत्वं तेजसस्त्रिगुणत्वमित्याद्युच्यते । सत्यम् । भूतसर्गे तात्पर्याभावद्योतनाय प्रक्रियान्तरं न विरुध्यते । न ह्येतत्प्रतिबद्धं किञ्चित्फलं श्रूयते । अत एव गुणगुणिभावोऽपि न वैशेषिकपक्षवदिह विवक्षितः । किंतु राहोः शिर इतिवद्व्यपदेशमात्रम् । विस्तरेण त्वन्त्यकार्यपर्यन्तं तेन तेनाऽऽकारेण ब्रह्मैव विवर्तत इति प्रपञ्च्यते ततोऽतिरिक्तस्याणुमात्रस्यासंभवात्तस्मिन्विज्ञाते सर्वमिदं विज्ञातं भवतीति प्रदर्शनार्थमित्यर्थः ॥ २.१.३ ॥",
    englishExplanation:
      "Ānandagiri notes why textual order of prāṇa before elements yields to logical order (since prāṇas are elemental), explains the cumulative quality-series (sound through smell) via vivarta rather than Vaiśeṣika substance-quality realism, and shows why omitting pañcīkaraṇa poses no contradiction—creation accounts exist solely to establish non-dual causality so knowing Brahman entails knowing all.",
  },
  "mundaka-2-1-4": {
    id: "tika-anandagiri-mundaka-2-1-4",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.4–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.४–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_1_4_5_TIKA,
    englishExplanation:
      "Ānandagiri glosses 'sarveṣāṁ bhūtānām antarātmā' as the cosmic Virāṭ embodied in the five gross elements, and links Mantra 2.1.5 to the Pañcāgni-vidyā (heaven, cloud, earth, man, woman).",
  },
  "mundaka-2-1-5": {
    id: "tika-anandagiri-mundaka-2-1-5",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.4–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.४–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_1_4_5_TIKA,
    englishExplanation:
      "Grouped with Mantra 2.1.4, clarifying that human generation unfolds through the five cosmic fires taught in the Chāndogya and Bṛhadāraṇyaka Pañcāgni-vidyā.",
  },
  "mundaka-2-1-6": {
    id: "tika-anandagiri-mundaka-2-1-6",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.6 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.६)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "पाञ्चभक्तिकमिति ।\n" +
      "हिङ्कारप्रस्तावोद्गीथप्रतिहारनिधनाख्याः पञ्च भक्तयोऽवयवा यस्य तत्तथोक्तम् । साप्तभक्तिकमिति । हिङ्कारप्रस्तावाद्युद्गीथप्रतिहारोपद्रवनिधनाख्याः सप्त भक्तयो यस्य तत्तथोक्तम् । स्तोभोऽर्थशून्यो वर्णः । विश्वजित्सर्वमेधयोः सर्वस्वदक्षिणा । अत एकां गामारभ्य सर्वस्वान्ता दक्षिणा भवन्तीत्यर्थः ॥ २.१.६ ॥",
    englishExplanation:
      "Ānandagiri enumerates the five and seven Sāman divisions ('pāñcabhaktikam' and 'sāptabhaktikam'), defines 'stobha' as non-lexical melodic syllables, and notes the range of sacrificial dakṣiṇā from one cow up to all possessions (in Viśvajit and Sarvamedha).",
  },
  "mundaka-2-1-7": {
    id: "tika-anandagiri-mundaka-2-1-7",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.7 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.७)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "तपश्च कर्माङ्गमिति ।\n" +
      "पयोव्रतं ब्राह्मणस्य यवागू राजन्यस्याऽऽमिक्षा वैश्यस्येत्यादिविहितं स्वतन्त्रं कृच्छ्रचान्द्रायणादीत्यर्थः ॥ २.१.७ ॥",
    englishExplanation:
      "Ānandagiri illustrates both ritual-subsidiary austerity (milk-fast for Brāhmaṇa, gruel for Kṣatriya, curds for Vaiśya) and independent expiatory austerities like Kṛcchra and Cāndrāyaṇa.",
  },
  "mundaka-2-1-8": {
    id: "tika-anandagiri-mundaka-2-1-8",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.8 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.८)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "आत्मयाजिनामति ।\n" +
      "सकलमिदमहं च परमात्मैवेति भावनापूर्वकं परमेश्वराराधनबुद्ध्या ये यजन्ति तेषामित्यर्थः ॥ २.१.८ ॥",
    englishExplanation:
      "Ānandagiri defines 'ātmayājinaḥ' as worshippers who sacrifice in the spirit of worshiping the Supreme Lord while contemplating 'all this and I myself are verily the Supreme Self'.",
  },
  "mundaka-2-1-9": {
    id: "tika-anandagiri-mundaka-2-1-9",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.9–10 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.९–१०)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_1_9_10_TIKA,
    englishExplanation:
      "Ānandagiri summarizes the conclusion of Khaṇḍa 2.1: Śaunaka's opening question is answered because everything originates from the Supreme Self, and knowing Him cuts the knot of avidyā here in the heart.",
  },
  "mundaka-2-1-10": {
    id: "tika-anandagiri-mundaka-2-1-10",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.1.9–10 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.१.९–१०)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_1_9_10_TIKA,
    englishExplanation:
      "Grouped with Mantra 2.1.9, concluding the First Khaṇḍa of the Second Muṇḍaka with the fruit of severing avidyā's knot.",
  },
  "mundaka-2-2-1": {
    id: "tika-anandagiri-mundaka-2-2-1",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.1 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.१)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "अधुना यस्य सकृदुपदेशमात्रेणाद्वितीयं ब्रह्मास्मीति वाक्यार्थज्ञानं न भवतीति तस्योपायानुष्ठानेन भवितव्यमित्यभिप्रेत्याऽऽह –\n" +
      "अरूपं सदक्षरमिति ।\n\n" +
      "वाक्यार्थस्यैव पुनः पुनर्भावना युक्त्यनुसंधानं चोपाय इत्याह –\n" +
      "उच्यत इति ।\n" +
      "आविःशब्दो निपातः प्रकाशवाची । ब्रह्म विश्वोपलब्ध्यात्मना प्रकाशमानमेव सदेति भावयेदित्यर्थः । अन्यैरप्युक्तम् –\n" +
      "“यदस्ति यद्भाति तदात्मरूपं नान्यत्ततो भाति न चान्यदस्ति ।\n" +
      "स्वभावसंवित्प्रतिभाति केवलं ग्राह्यं ग्रहीतेति मृषैव कल्पना ॥” इति ।\n\n" +
      "संनिहितमिति ।\n" +
      "सर्वेषां प्राणिनां हृदये स्थितं वागाद्युपाधिभिः शब्दादीन्युपलभमानवद्ब्रह्मैव जीवभावमापन्नमवभासते । ततः स्वतोऽपरोक्षं चेति सदा स्मरेदित्यर्थः ।\n\n" +
      "सर्वमिदं कार्यं परिच्छिन्नं च सास्पदं कार्यत्वात्परिच्छिन्नत्वाच्च घटादिवत्ततः सर्वास्पदं यत्तदेव मायास्पदमात्मभूतमिति युक्त्यनुसन्धानमाह –\n" +
      "महत्पदमिति ॥ २.२.१ ॥",
    englishExplanation:
      "Ānandagiri introduces Khaṇḍa 2.2 as prescribing repeated contemplation and reasoned inquiry for seekers who do not attain immediate conviction from a single hearing; glosses 'āviḥ' as an indeclinable denoting self-luminous awareness (citing the Advaita verse 'Yad asti yad bhāti tad ātmarūpam'); and formulates the inference establishing 'mahat padam' as the universal substratum.",
  },
  "mundaka-2-2-2": {
    id: "tika-anandagiri-mundaka-2-2-2",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.2 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "घटादिवदादित्यादेर्जडत्वेपि यद्दीप्तिमत्त्वं वैचित्र्यं तदनुपपत्त्याऽपि तत्कारणं संभावनीयमित्याह –\n" +
      "किञ्च यदर्चिमदिति ।\n\n" +
      "अर्चिमत्त्वादादित्यादिवदिन्द्रियग्राह्यत्वं प्राप्तं निषेधयति –\n" +
      "यदणुभ्य इति ।\n\n" +
      "परमाणुपरिमाणत्वं तर्हि स्यादिति नाऽऽशङ्कनीयमित्याह –\n" +
      "चशब्दादिति ।\n\n" +
      "स्थूलत्वात्तर्ह्यन्याधारं स्यादिति नाऽऽशङ्कनीयमित्याह –\n" +
      "यस्मिँल्लोका इति ।\n\n" +
      "प्राणादिप्रवृत्तिश्चेतनाधिष्ठाननिबन्धना जडप्रवृत्तित्वाद्रथादिप्रवृत्तिवच्चिद्भेदे च प्रमाणाभावादेकचैतन्यमात्रमस्मीति विचारयेदित्याह –\n" +
      "तदेतत्सर्वाश्रयमिति ।\n" +
      "प्राणाद्यधिष्ठानत्वात्प्राणादिलक्ष्य आत्मा द्रष्टव्यः ॥ २.२.२ ॥",
    englishExplanation:
      "Ānandagiri traces the logical dialetic of each clause in Mantra 2.2.2: 'arcimat' infers the source of luminaries' light, 'aṇubhyo'ṇu' denies sensory visibility, 'ca' counters atomic limitation, 'yasmiḻ lokāḥ' negates dependence on another substratum, and 'prāṇa' proves via the chariot-motion analogy that insentient vital breaths require one non-dual conscious substratum.",
  },
  "mundaka-2-2-3": {
    id: "tika-anandagiri-mundaka-2-2-3",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.3–4 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.३–४)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_2_3_4_TIKA,
    englishExplanation:
      "Ānandagiri explains the Praṇava-archery meditation as an aid for aspirants unable to grasp non-duality through pure inquiry alone: fixing the reflected consciousness tinged by OM upon the bow of Praṇava and merging the reflection into its Prototype.",
  },
  "mundaka-2-2-4": {
    id: "tika-anandagiri-mundaka-2-2-4",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.3–4 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.३–४)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_2_3_4_TIKA,
    englishExplanation:
      "Grouped with Mantra 2.2.3, articulating the bimba-pratibimba (prototype-reflection) unity between the jīva-arrow and Brahman-target via Praṇava.",
  },
  "mundaka-2-2-5": {
    id: "tika-anandagiri-mundaka-2-2-5",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "उत्तरग्रन्थस्य पौनरुक्त्यं परिहरति –\n" +
      "अक्षरस्यैव दुर्लक्ष्यत्वादिति ।\n\n" +
      "ससाधनं सर्वं कर्म परित्यज्याऽऽत्मैव ज्ञातव्य इत्यत्रैव हेतुमाह –\n" +
      "अमृतस्येति ।\n" +
      "धनुषाऽऽयुधेन लक्ष्यत इति तल्लक्षण आत्मैकत्वसाक्षात्कार इत्यर्थः ॥ २.२.५ ॥",
    englishExplanation:
      "Ānandagiri notes why Mantra 2.2.5 avoids redundancy (because the subtle Akṣara requires repeated pointing) and why abandoning all ritual speech is justified—because direct realization of Self-unity ('amṛtasya setuḥ') is the sole bridge to immortality.",
  },
  "mundaka-2-2-6": {
    id: "tika-anandagiri-mundaka-2-2-6",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.6 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.६)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "कर्मसङ्गिजनसङ्गत्या कर्मश्रद्धा विषयश्रद्धा च वाक्यार्थज्ञानस्यावगमाय गत्यन्ततायाः प्रतिबन्धको विघ्नः स मा भूदित्याशंसनम् । न तु वाक्यार्थावगतौ निष्पन्नायां फलप्राप्तेर्विघ्नशङ्काऽस्तीत्यभिप्रेत्याऽऽह –\n" +
      "परस्तादिति ।\n" +
      "मदुपदेशादूर्ध्वमित्यर्थः ॥ २.२.६ ॥",
    englishExplanation:
      "Ānandagiri clarifies that the preceptor's benediction 'svasti vaḥ pārāya' wards off obstacles prior to the dawn of understanding (such as lingering faith in karma or sensory objects from associating with ritualists), since once realization dawns, no obstacle can block its fruit.",
  },
  "mundaka-2-2-7": {
    id: "tika-anandagiri-mundaka-2-2-7",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.7–8 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.७–८)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_2_7_8_TIKA,
    englishExplanation:
      "Ānandagiri notes that Mantras 2.2.7–8 prescribe heart-lotus meditation on Brahman qualified by omniscience ('sarvajña'), universal lordship, and mind-conditioned bliss ('manomaya') for slower aspirants aiming at gradual liberation.",
  },
  "mundaka-2-2-8": {
    id: "tika-anandagiri-mundaka-2-2-8",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.7–8 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.७–८)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_2_7_8_TIKA,
    englishExplanation:
      "Grouped with Mantra 2.2.7, expressly referenced in Ānandagiri's remark on contemplating Brahman qualified by 'manomayatva' in the lotus of the heart.",
  },
  "mundaka-2-2-9": {
    id: "tika-anandagiri-mundaka-2-2-9",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.9–10 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.९–१०)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_2_9_10_TIKA,
    englishExplanation:
      "A landmark Advaita dialectic: Ānandagiri raises deep objections against Śaṅkara's locution that the 'heart-knot' of avidyā-impressions resides in the buddhi rather than the Self, and resolves them via consciousness-dependent, beginningless, indeterminable avidyā—showing that the Bhāṣya's attribution to buddhi reflects empirical egoity while denying it to Ātman safeguards the Self's immutability, fully harmonizing jīvanmukti (persisting sublated appearance).",
  },
  "mundaka-2-2-10": {
    id: "tika-anandagiri-mundaka-2-2-10",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.9–10 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.९–१०)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_2_2_9_10_TIKA,
    englishExplanation:
      "Grouped with Mantra 2.2.9 in the traditional Bhāṣya-Ṭīkā division, continuing into the radiant purity of the supreme golden sheath.",
  },
  "mundaka-2-2-11": {
    id: "tika-anandagiri-mundaka-2-2-11",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.11 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.११)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "भातीति णिजर्थाध्याहारेण व्याख्यातम् । तस्य भासा सर्वमिदं विभातीत्यस्य ब्रह्मणः स्वतो भारूपत्वे तात्पर्यं कथयति –\n" +
      "यत एव तदेव ब्रह्म भाति चेति ॥ २.२.१० ॥",
    englishExplanation:
      "Ānandagiri notes that 'bhāti' (the sun does not shine there) is interpreted with an implied causative sense ('does not illuminate Brahman'), and highlights how 'tasya bhāsā' establishes Brahman's intrinsic self-luminosity ('bhārūpatva'). (Numbered 2.2.10 in editions combining 2.2.7–8.)",
  },
  "mundaka-2-2-12": {
    id: "tika-anandagiri-mundaka-2-2-12",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 2.2.12 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (२.२.१२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "उपसंहारमन्त्रस्य तात्पर्यमाह – यत्तज्ज्योतिषां ज्योतिरिति तेन ब्रह्मणा विविधं क्रियत इति तद्विकारं सर्वं जगत्सर्वं ब्रह्मैवेति बाधायां सामानाधिकरण्यं योऽयं स्थाणुः पुमानसावितिवदन्वयव्यतिरेकाभावपरिहारेण तावन्मात्रत्वं बोध्यते ॥ २.२.११ ॥\n" +
      "इत्यथर्ववेदीयमुण्डकोपनिषद्भाष्यटीकायां द्वितीयमुण्डके द्वितीयः खण्डः ॥ २.२ ॥\n" +
      "इत्यथर्ववेदीयमुण्डकोपनिषद्भाष्यटीकायां द्वितीयं मुण्डकं समाप्तम् ॥ २ ॥",
    englishExplanation:
      "Ānandagiri explains the concluding mantra's predication 'all this universe is Brahman' as 'bādhāyāṁ sāmānādhikaraṇyam' (sublating apposition, like 'this man is indeed a post'), conveying that Brahman alone exists without a second. (Numbered 2.2.11 in editions combining 2.2.7–8.)",
  },
  "mundaka-3-1-1": {
    id: "tika-anandagiri-mundaka-3-1-1",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.1 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.१)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "तृतीयं मुण्डकम्: प्रथमः खण्डः\n\n" +
      "प्राधान्येनेति ।\n" +
      "अपूर्वत्वेन तात्पर्यविषयतयेत्यर्थः । द्वा सुपर्णेत्यादौ द्विवचनस्याऽऽकारश्छान्दसः । जीवस्याज्ञत्वेन नियम्यत्वेन योग्यत्वादीश्वरस्य सर्वज्ञत्वेन नियामकत्वशक्तियोगाच्छोभनमुचितं पतनं नियम्यनियामकभावगमनं ययोस्तौ शोभनपतनौ ।\n\n" +
      "पक्षिसामान्याद्वेति ।\n" +
      "वृक्षाश्रयणादिश्रवणादित्यर्थः । ऊर्ध्वमुत्कृष्टं ब्रह्म मूलमधिष्ठानमस्येत्यूर्ध्वमूलोऽवाञ्चः प्राणादयः शाखा इवास्येत्यवाक्शाखः । श्वः स्थानं नियन्तुमस्य न शक्यमित्यश्वत्थः । अव्यक्तमव्याकृतं मूलमुपादानमन्वयि तस्मात्प्रभवतीति तथोक्तो यावदज्ञानभावीत्यर्थः । अविद्याकामकर्मवासनानामाश्रयो लिङ्गमुपाधिर्यस्याऽऽत्मनः स जीवस्तथोक्तः स चेश्वरश्च तावित्यर्थः । सत्त्वं मायाख्यमुपाधिरस्येति सत्त्वोपाधिः । ज्ञानात्मकस्यामलसत्त्वराशेरिति ह्युक्तम् ॥ ३.१.१ ॥",
    englishExplanation:
      "Ānandagiri opens the Third Muṇḍaka by explaining the Vedic dual 'dvā suparṇā', deriving 'suparṇau' from appropriate relation of controller (Īśvara) and controlled (jīva) or bird-likeness, unpacking the etymology of 'aśvattha' ('not lasting till tomorrow'), and contrasting the jīva's upādhi (the subtle body of avidyā-kāma-karma) with Īśvara's upādhi (pure sattva-Māyā).",
  },
  "mundaka-3-1-2": {
    id: "tika-anandagiri-mundaka-3-1-2",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.2–3 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.२–३)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_1_2_3_TIKA,
    englishExplanation:
      "Ānandagiri maps 'anīśayā' and 'śocati' to the twofold power of avidyā—concealment (āvaraṇa: non-apprehension of Lordship) and projection (vikṣepa: sorrow and delusion)—and glosses 'ājavam' as swift, helpless descent impelled by the winds of karma.",
  },
  "mundaka-3-1-3": {
    id: "tika-anandagiri-mundaka-3-1-3",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.2–3 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.२–३)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_1_2_3_TIKA,
    englishExplanation:
      "Grouped with Mantra 3.1.2, noting 'pūrvavat'—that shedding merit and demerit leads to supreme equanimity and non-difference with the Lord.",
  },
  "mundaka-3-1-4": {
    id: "tika-anandagiri-mundaka-3-1-4",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.4 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.४)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "आत्मनि रतिरात्मरतिस्तत्पुरुषः सैव क्रियाऽस्यास्तीत्यात्मक्रीड आत्मरतिक्रियावानिति मतुबेवैकः प्रतीयते कथमुक्तं बहुव्रीहिमतुबर्थयोरन्यतरोऽतिरिच्यत इति । सत्यमसमासपाठे द्वयोरर्थवत्त्वमासीत्समासपाठे त्वन्यतरो मतुबतिरिच्यते विशिष्यते बाह्यक्रियानिवृत्तिलाभादित्यर्थः । एकदेशिव्याख्यामुद्भाव्य निराचष्टे –\n" +
      "केचित्त्वित्यादिना ।\n" +
      "अनेन वचनेन ज्ञानकर्मसमुच्चयप्रतिपादनं क्रियत इत्येतदसत्प्रलपितमेवेति योजना ॥ ३.१.४ ॥",
    englishExplanation:
      "Ānandagiri explains the grammatical point on 'ātmakrīḍa ātmaratiḥ kriyāvān' (in compounded vs. uncompounded readings, the possessive sense remains meaningful by highlighting cessation of outward ritual action) and reinforces Śaṅkara's dismissal of rival jñāna-karma-samuccaya readings as incoherent prattle.",
  },
  "mundaka-3-1-5": {
    id: "tika-anandagiri-mundaka-3-1-5",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "सम्यग्ज्ञानसहकारीणीति ।\n" +
      "अत्र सम्यग्ज्ञानशब्देन वस्तुविषयावगतिफलावसानं वाक्यार्थज्ञानमुच्यते अवगतिफलस्य स्वकार्येऽविद्यानिवृत्तौ सहकार्यपेक्षासम्भवात् । अतोऽपरिपक्वज्ञानस्य सत्यादीनां च परिपक्वविद्यालाभाय समुच्चय इष्यत एव । नैतावता भास्कराभिमतसिद्धिः । परिपक्वविद्यायाः सहकार्यपेक्षायां मानाभावात् । ततः कर्मासंश्लेषश्रवणाद्देवादीनां कर्मविहीनानां मुक्तिश्रवणाच्चेति ॥ ३.१.५ ॥",
    englishExplanation:
      "Ānandagiri makes a crucial clarification against Bhāskara's Bhedābheda reading: when Śaṅkara calls truth, tapas, etc. 'auxiliaries of right knowledge', he means auxiliaries helping immature verbal comprehension mature into direct, steady realization—not that mature realization needs ritual karma as a co-cause of liberation.",
  },
  "mundaka-3-1-6": {
    id: "tika-anandagiri-mundaka-3-1-6",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.6 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.६)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "कुहकं परवञ्चनम् । अन्तरन्यथा गृहीत्वा बहिरन्यथा प्रकाशनं माया । शाठ्यं विभवानुसारेणाप्रदानम् । अहङ्कारो मिथ्याभिमानः । दम्भो धर्मध्वजित्वम् । अनृतमयथादृष्टभाषणम् । एतैर्दोषैर्वर्जिता इत्यर्थः ॥ ३.१.६ ॥",
    englishExplanation:
      "Ānandagiri gives precise definitions of the six moral blemishes absent in the seers who attain the supreme abode of Truth: kuhaka (deception), māyā (hypocrisy), śāṭhya (stinginess despite means), ahaṅkāra (false pride), dambha (ostentatious piety), and anṛta (falsehood).",
  },
  "mundaka-3-1-7": {
    id: "tika-anandagiri-mundaka-3-1-7",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.7 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.७)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: "सत्यस्य निधानं यदुक्तं तत्पुनर्विशेष्यत इत्याह –\nकिं तत्किंधर्मकं च तदिति ॥ ३.१.७ ॥",
    englishExplanation:
      "Ānandagiri highlights the transition from Mantra 3.1.6 to 3.1.7: having named 'the supreme treasure of Truth', the text now specifies what it is and what its paradoxical attributes are.",
  },
  "mundaka-3-1-8": {
    id: "tika-anandagiri-mundaka-3-1-8",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.8 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.८)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "ज्ञानप्रसादेनेति ।\n" +
      "अत्र ज्ञायतेऽर्थोऽनेनेति व्युत्पत्त्या बुद्धिरुच्यते । ध्यायमानो ज्ञानप्रसादं लभते । ज्ञानप्रसादेनाऽऽत्मानं पश्यतीति क्रमो द्रष्टव्यः । संशयादिमलरहितस्य प्रमाणज्ञानस्यैव तत्त्वसाक्षात्कारहेतुत्वाद्ध्यानक्रियायाः प्रमितिसाधनत्वाप्रसिद्धेरित्यर्थः ॥ ३.१.८ ॥",
    englishExplanation:
      "Ānandagiri clarifies the causal order in 'jñāna-prasādena... paśyate dhyāyamānaḥ': 'jñāna' means the intellect ('that by which objects are known'); through meditation one attains purity/serenity of the intellect ('jñāna-prasāda'), and by that purified intellect sees the Self via valid scriptural pramāṇa—since meditation as an action cannot itself generate pramiti (valid knowledge).",
  },
  "mundaka-3-1-9": {
    id: "tika-anandagiri-mundaka-3-1-9",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "बौद्धादेश्चित्तादौ चेतनत्वभ्रमदर्शनाच्चित्तं स्वस्मिन्स्वसंसर्गिणि च चैतन्याभिव्यञ्जकत्वे स्वभावत एव योग्यम् । ततश्चित्ते परमात्मनोऽभिव्यक्तिसम्भवाच्चेतसा ज्ञेयत्वमुच्यत इति संभावनार्थमाह –\n" +
      "प्राणैः सहेन्द्रियैश्चित्तमेति ।\n\n" +
      "ओतं चैतन्येन सर्वं तर्हि चित्ते किमिति ब्रह्म स्वत एवापरोक्षं न भवतीत्यत आह –\n" +
      "यस्मिंश्च चित्त इति ॥ ३.१.९ ॥",
    englishExplanation:
      "Ānandagiri explains why the subtle Self is said to be known 'by the mind' ('cetasā'): the mind is naturally suited to manifest Consciousness (which explains why Buddhists mistake mind itself for sentient), and yet Brahman is not immediately manifest in an impure mind until afflictions are removed.",
  },
  "mundaka-3-1-10": {
    id: "tika-anandagiri-mundaka-3-1-10",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.1.10 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.१.१०)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "सगुणविद्याफलमपि निर्गुणविद्यास्तुतये प्ररोचनार्थमुच्यते –\n" +
      "यं यमिति ॥ ३.१.१० ॥\n" +
      "इत्यथर्ववेदीयमुण्डकोपनिषद्भाष्यटीकायां तृतीयमुण्डके प्रथमः खण्डः ॥ ३.१ ॥",
    englishExplanation:
      "Ānandagiri notes that even the empirical prosperity fruit of saguṇa realization mentioned in 3.1.10 serves to eulogize and inspire eagerness toward nirguṇa Brahmavidyā, closing the First Khaṇḍa of the Third Muṇḍaka.",
  },
  "mundaka-3-2-1": {
    id: "tika-anandagiri-mundaka-3-2-1",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.1 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.१)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: "॥ ३.२.१ ॥",
    englishExplanation:
      "In the traditional Ānandagiri-Ṭīkā text, Mantra 3.2.1 is marked directly without a separate pratīka gloss (continuing the theme from 3.1.10 of revering the Self-knower), and Ānandagiri resumes commentary immediately at Mantra 3.2.2.",
  },
  "mundaka-3-2-2": {
    id: "tika-anandagiri-mundaka-3-2-2",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.2 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.२)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "परमार्थतत्त्वविज्ञानादिति ।\n" +
      "विषयेषु यथास्थितदोषदर्शनात्पर्याप्तकामः क्षीणरागो विरुद्धलक्षणयाऽऽत्मकामस्याऽऽत्मबुभुत्सयैव वशीकृतचित्तस्य विषयेभ्यः कामा निवृत्ता एव भवन्तीत्यर्थः । सामर्थ्यादवगम्यते स्वहेतुविनाशात्पुनः कामा न जायन्त इति । जातानां ज्ञानं विनाऽपि क्षयसम्भवादित्यर्थः ॥ ३.२.२ ॥",
    englishExplanation:
      "Ānandagiri explains 'paryāptakāmaḥ' through seeing defects in sense objects so desire turns solely toward the Self, and clarifies why 'kāmāḥ pravilīyanti' implies non-rearising through destruction of their root cause (avidyā), since mere fading of particular desires happens even without knowledge.",
  },
  "mundaka-3-2-3": {
    id: "tika-anandagiri-mundaka-3-2-3",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.3 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.३)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "न बहुना श्रुतेनेति ।\n" +
      "उपनिषद्विचारव्यतिरिक्तेनेत्यर्थः । तेन वरणेनेति कथं व्याख्यातं यत्तदोर्भिन्नार्थत्वं? साधनविवक्षायाः प्रस्तुतत्वादित्यर्थं ब्रूमः । परमात्माऽस्मीत्यभेदानुसंधानं वरणम् । तेन वरणेनैष आत्मा लभ्यो भवति । बहिर्मुखेन तु शतशोऽपि श्रवणादौ क्रियमाणे न लभ्यते । अतः परमात्माऽस्मीत्यभेदानुसंधानं परमात्मभजनं पुरस्कृत्यैव श्रवणादि सम्पादनीयमिति भावः । अथवाऽयमेव परमात्मानं वृणुते तेन परमात्मना मुमुक्षुरूपव्यवस्थितेन वरणेनाभेदानुसंधानलक्षणेन प्रार्थनेन कृत्वा लभ्यः परमात्मैव मुमुक्षुरूपव्यवस्थित इत्यभेदानुसंधानेनैव लभ्यो न कर्मणेत्यर्थः ॥ ३.२.३ ॥",
    englishExplanation:
      "Ānandagiri resolves the grammatical shift between 'yam' and 'tena' in 'yam evaiṣa vṛṇute tena labhyaḥ': because the context concerns the means ('sādhana') to attain the Self, 'tena' refers to the act of choosing ('varaṇa')—namely, inward non-dual contemplation 'I am the Supreme Self', without which even hundreds of hearings fail.",
  },
  "mundaka-3-2-4": {
    id: "tika-anandagiri-mundaka-3-2-4",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.4–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.४–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_4_5_TIKA,
    englishExplanation:
      "Ānandagiri defines 'vīrya' as invincibility to false knowledge and resolves how Indra, Janaka, and Gārgī attained Self-knowledge despite Śaṅkara's gloss of 'aliṅgāt' as 'without sannyāsa': inner renunciation of ownership is essential, while outward monastic insignia ('bāhya liṅga') are secondary ('na liṅgaṁ dharmakāraṇam').",
  },
  "mundaka-3-2-5": {
    id: "tika-anandagiri-mundaka-3-2-5",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.4–5 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.४–५)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_4_5_TIKA,
    englishExplanation:
      "Grouped with Mantra 3.2.4, reinforcing that inner renunciation and cessation of ritual agency ('naiṣkarmya-sāhitya') accompany wisdom as the seers enter the All.",
  },
  "mundaka-3-2-6": {
    id: "tika-anandagiri-mundaka-3-2-6",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.6 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.६)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract:
      "प्रदीपस्य वर्तिकृतावच्छेदध्वंसे यथा तेजःसामान्यतापत्तिस्तद्वदित्याह –\n" +
      "प्रदीपनिर्वाणवदिति ।\n" +
      "पदं पादन्यासप्रतिबिम्बं च । न दृश्येताभावादेवेत्यर्थः ।\n\n" +
      "अध्वस्विति ।\n" +
      "संसाराध्वनां पारयिष्णवः पारयितुं समापयितुमिच्छन्तीति समाप्तिकामा अनध्वगा भवन्तीत्यर्थः ।\n\n" +
      "तर्कतोऽपीहैव मोक्षो वक्तव्य इत्याह –\n" +
      "देशपरिच्छिन्ना हीत्यादिना ॥ ३.२.६ ॥",
    englishExplanation:
      "Ānandagiri explains the extinguished lamp simile (universal luminosity upon destruction of the wick-limitation), glosses 'pada' (footprint/track) and 'anadhvagā adhvāsu pārayiṣṇavaḥ' (aspiring to end all transmigration paths, they walk no path), and highlights Śaṅkara's logical proof against localized liberation.",
  },
  "mundaka-3-2-7": {
    id: "tika-anandagiri-mundaka-3-2-7",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.7–9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.७–९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_7_9_TIKA,
    englishExplanation:
      "Ānandagiri cross-references the fifteen kalās to the Sixth Praśna of Praśnopaniṣad and clarifies how individual prāṇas—constructed from subtle elements informed by Māyā and individual karma and presided over by deities like the Sun—dissolve back into their elemental sources and cosmic deities when prārabdha experience ends.",
  },
  "mundaka-3-2-8": {
    id: "tika-anandagiri-mundaka-3-2-8",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.7–9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.७–९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_7_9_TIKA,
    englishExplanation:
      "Grouped with Mantras 3.2.7–9, showing that every individual effect of one's own avidyā (symbolized by rivers shedding name and form into the ocean) becomes Brahman Itself.",
  },
  "mundaka-3-2-9": {
    id: "tika-anandagiri-mundaka-3-2-9",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.7–9 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.७–९)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_7_9_TIKA,
    englishExplanation:
      "Grouped with Mantras 3.2.7–8, concluding the dissolution of all avidyā-effects in non-dual Brahman ('brahmavid brahmaiva bhavati').",
  },
  "mundaka-3-2-10": {
    id: "tika-anandagiri-mundaka-3-2-10",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.10–11 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.१०–११)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_10_11_TIKA,
    englishExplanation:
      "Ānandagiri notes that the demonstrative 'etām' ('this Brahmavidyā') qualifies the Śirovrata rule specifically for transmitting Brahmavidyā through this Atharvavedic text rather than restricting Brahmavidyā universally to Atharvaṇa initiates, closing the Third Muṇḍaka.",
  },
  "mundaka-3-2-11": {
    id: "tika-anandagiri-mundaka-3-2-11",
    name: "Ānandagiri-Ṭīkā on Muṇḍakopaniṣad Bhāṣya 3.2.10–11 (आनन्दगिरिटीका)",
    devanagariName: "आनन्दगिरिटीका (३.२.१०–११)",
    author: "Śrīmad Ānandagiri / Ānandajñāna (श्रीमदानन्दज्ञानः)",
    century: "13th Century CE",
    tradition: "Śāṅkara-Bhāṣya-Ṭīkā",
    mulaExtract: MUNDAKA_3_2_10_11_TIKA,
    englishExplanation:
      "Grouped with Mantra 3.2.10, marking the auspicious completion of Ānandagiri's Ṭīkā on the Third Muṇḍaka and the entire Atharvavedic Muṇḍakopaniṣad Śāṅkarabhāṣyam.",
  },
};
