type ResearchMetric = {
  label: string
  value: string
}

type ResearchSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ResearchWork = {
  slug: string
  title: string
  published: string
  category: string
  summary: string
  keywords: string[]
  paperUrl: string
  metrics: ResearchMetric[]
  sections: ResearchSection[]
}

const researchWorks: ResearchWork[] = [
  {
    slug: "smart-phone-sensor-data-fusion-a-joint-learning-approach-to-activity-recognition",
    title:
      "Smart Phone Sensor Data Fusion: A Joint Learning Approach to Activity Recognition",
    published: "June 2025",
    category: "Research Work",
    summary:
      "A deep learning system for smartphone-based human activity recognition using accelerometer and gyroscope data, comparing a Full Transformer model with a proposed Joint Learning fusion architecture.",
    keywords: [
      "Human Activity Recognition",
      "Sensor Fusion",
      "CNN-LSTM",
      "Transformers",
      "UCI-HAR",
    ],
    paperUrl: "https://link.springer.com/chapter/10.1007/978-3-031-88217-3_8",
    metrics: [
      { label: "Best accuracy", value: "98%" },
      { label: "Best F1 score", value: "98%" },
      { label: "Dataset", value: "UCI-HAR" },
    ],
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "This project developed a deep learning-based system to classify human activities using smartphone sensor data from accelerometers and gyroscopes. Two architectures were designed and tested: a Full Transformer model and a Joint Learning model that fuses CNN-LSTM and Transformer components.",
          "The goal was to combine spatial and temporal modeling techniques so the system could recognize activity patterns from noisy, multi-dimensional sensor signals while handling subtle transitions between similar movements.",
        ],
      },
      {
        title: "Motivation",
        paragraphs: [
          "Smartphones and wearable devices have made activity recognition useful for fitness tracking, elderly care, and mobile health. Real-world sensor data is noisy and high-dimensional, which makes it difficult for traditional models to capture both local patterns and long-range dependencies.",
          "This research used a hybrid architecture that integrates CNNs for spatial pattern extraction, Transformers for long-range dependencies, and LSTMs for sequential modeling.",
        ],
      },
      {
        title: "Dataset",
        paragraphs: [
          "The work used the UCI-HAR Human Activity Recognition dataset, a benchmark dataset with 7,352 records across six labeled activities: walking, walking upstairs, walking downstairs, sitting, standing, and laying.",
        ],
        bullets: [
          "Each record includes 561 sensor-derived features.",
          "Features were scaled using StandardScaler.",
          "The dataset was split into 70% training data and 30% test data.",
        ],
      },
      {
        title: "Architectures",
        paragraphs: [
          "The Full Transformer architecture used positional encoding, six parallel Conv1D branches, multi-head self-attention, LSTM layers, global average pooling, dropout regularization, and a final Softmax classifier over six activities.",
          "The proposed Joint Learning architecture combined a CNN-LSTM stream for local temporal feature learning with a Transformer stream for global attention-based modeling. The branches were merged and trained jointly with Adam for 50 epochs.",
        ],
      },
      {
        title: "Results",
        bullets: [
          "Full Transformer accuracy: 96%.",
          "Joint Learning accuracy: 98%.",
          "Joint Learning F1 score: 98%.",
          "The model was evaluated using confusion matrix, classification report, and ROC curves.",
        ],
      },
      {
        title: "My Contributions",
        bullets: [
          "Designed, implemented, and trained both architectures using TensorFlow and Keras.",
          "Preprocessed the UCI-HAR dataset, standardized features, and performed data analysis.",
          "Benchmarked the results against state-of-the-art models and visualized evaluation metrics.",
          "Drafted model comparisons and handled performance tuning.",
        ],
      },
      {
        title: "Future Work",
        bullets: [
          "Experiment with GRU-Transformer hybrid architectures.",
          "Study performance scaling with more CNN heads.",
          "Collect larger and more diverse activity datasets.",
          "Deploy the model on mobile or edge environments for real-time activity tracking.",
        ],
      },
      {
        title: "Final Takeaway",
        paragraphs: [
          "This work shows how deep fusion architectures can extract both short-term features and long-term patterns from multi-sensor data. Combining CNNs, LSTMs, and Transformers produced a robust activity-recognition model suitable for real-world applications.",
        ],
      },
    ],
  },
  {
    slug: "icgnis-2023",
    title:
      "Early Prediction of Down Syndrome Using Deep Transfer Learning-Based Approaches",
    published: "June 2025",
    category: "Research Work",
    summary:
      "A transfer learning study for early Down Syndrome screening from facial images using multiple pre-trained CNN architectures and targeted fine-tuning.",
    keywords: [
      "Deep Learning",
      "Transfer Learning",
      "Medical Imaging",
      "CNN",
      "Xception",
    ],
    paperUrl:
      "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003466383-31/early-prediction-syndrome-using-deep-transfer-learning-based-approaches-nirmit-patel-tarang-ghetia-devraj-jhala-shubh-kapadia-yogesh-kumar",
    metrics: [
      { label: "Dataset size", value: "~3,000 images" },
      { label: "Best model", value: "Xception" },
      { label: "Split", value: "75 / 25" },
    ],
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "This research project focused on building a deep learning-based system to detect Down Syndrome in children using facial images. The goal was to create a non-contact early screening approach that could assist clinicians or caregivers in identifying potential signs with high accuracy.",
        ],
      },
      {
        title: "Motivation",
        paragraphs: [
          "Down Syndrome, caused by an extra chromosome 21, is one of the most common genetic disorders globally. Early detection helps with timely medical and social interventions.",
          "Because facial characteristics are often indicative of the condition, this work explored whether convolutional neural networks could learn subtle visual differences between Down Syndrome and non-Down Syndrome children.",
        ],
      },
      {
        title: "Dataset",
        paragraphs: [
          "The work used a public Kaggle dataset containing around 3,000 facial images of children. The dataset was roughly balanced between children diagnosed with Down Syndrome and children without Down Syndrome, with ages ranging from 0 to 15 years.",
        ],
        bullets: [
          "Images were resized and normalized before training.",
          "Augmentation included rotation, flipping, and zooming.",
          "The data was split into 75% training and 25% test sets.",
        ],
      },
      {
        title: "Methodology",
        paragraphs: [
          "Transfer learning was applied using four pre-trained CNN architectures: Xception, InceptionV3, DenseNet121, and EfficientNetB0. Early layers were frozen to preserve general visual features, while deeper layers were fine-tuned for the task.",
          "Batch size, learning rate, and dropout were tuned carefully to improve stability and reduce overfitting.",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "All evaluated models achieved strong accuracy, with Xception producing the best overall performance. Its depthwise separable convolution design helped capture fine-grained facial patterns efficiently and consistently.",
        ],
      },
      {
        title: "Final Takeaway",
        paragraphs: [
          "This project demonstrates how transfer learning can make medical-image classification more practical when labeled data is limited. The study also highlights the importance of model selection and careful fine-tuning in sensitive screening workflows.",
        ],
      },
    ],
  },
  {
    slug: "non-contact-inspection-of-electrically-discharged-materials-using-machine-learning",
    title:
      "Non-contact Inspection of Electrically Discharged Materials Using Machine Learning",
    published: "July 2024",
    category: "Research Work",
    summary:
      "A machine learning approach for predicting surface roughness in EDM-machined materials using process parameters instead of contact-based inspection.",
    keywords: [
      "Machine Learning",
      "Manufacturing",
      "EDM",
      "Regression",
      "Non-contact Inspection",
    ],
    paperUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=GmIpPnIAAAAJ&citation_for_view=GmIpPnIAAAAJ:u-x6o8ySG0sC",
    metrics: [
      { label: "Best model", value: "KNN" },
      { label: "R2 score", value: "~0.999" },
      { label: "Augmented samples", value: "9,300" },
    ],
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "This project predicts the surface roughness of metals machined by Electrical Discharge Machining using non-contact inspection methods and machine learning. Traditional inspection approaches are often contact-based, slow, and risky for precision surfaces.",
          "The research introduces a data-driven alternative that uses regression algorithms on experimentally collected and augmented data to estimate surface roughness from process parameters.",
        ],
      },
      {
        title: "What is EDM and Why It Matters",
        paragraphs: [
          "Electrical Discharge Machining is a non-conventional manufacturing process used for hard-to-machine materials. Surface roughness, represented as Ra, is a critical quality metric, but it is often measured with physical probes.",
          "The aim was to remove the need for contact-based inspection by building a predictive model that estimates surface roughness from process parameters, enabling faster and safer evaluation.",
        ],
      },
      {
        title: "Data Collection and Augmentation",
        paragraphs: [
          "Experimental data was collected using a real EDM machine setup at the university. Pulse on time, pulse off time, current, and voltage were recorded along with measured surface roughness.",
        ],
        bullets: [
          "The initial dataset contained 31 experimental data points.",
          "Data augmentation used scaling, shifting, and controlled noise injection.",
          "The augmented dataset contained 9,300 samples for model training and evaluation.",
        ],
      },
      {
        title: "Models Used",
        paragraphs: [
          "Three regression algorithms were trained and compared: K-Nearest Neighbors, Support Vector Regressor, and Random Forest Regressor. Each model used an 80:20 train-test split and was evaluated with R2 score and Mean Squared Error.",
        ],
      },
      {
        title: "Key Findings",
        bullets: [
          "K-Nearest Neighbors consistently outperformed the other models.",
          "KNN reached an R2 score of approximately 0.999.",
          "KNN produced an MSE of approximately 0.00157.",
          "Predicted-vs-actual plots and residual histograms confirmed tight, unbiased predictions.",
        ],
      },
      {
        title: "Benchmarking",
        paragraphs: [
          "The work compared the results with approaches such as neural networks, W-ELM, SinGAN, Taguchi-ANN hybrids, and fuzzy logic systems. The simpler KNN-based approach matched or exceeded several reported results while remaining easier to deploy.",
        ],
      },
      {
        title: "My Role",
        bullets: [
          "Conducted EDM experiments.",
          "Designed the data augmentation strategy.",
          "Implemented all regression models.",
          "Analyzed and visualized model performance.",
          "Compared outcomes with state-of-the-art methods.",
        ],
      },
      {
        title: "Future Scope",
        bullets: [
          "Integrate the model with EDM machines for live surface monitoring.",
          "Use deep learning or transformers on surface image data for broader generalization.",
          "Explore 3D surface reconstruction with non-contact sensors.",
        ],
      },
      {
        title: "Final Takeaway",
        paragraphs: [
          "This research shows how simple but well-prepared machine learning models can replace invasive inspection workflows, making manufacturing evaluation faster, safer, and easier to automate.",
        ],
      },
    ],
  },
]

function getResearchWorks() {
  return researchWorks
}

function getResearchWork(slug: string) {
  return researchWorks.find((work) => work.slug === slug) ?? null
}

export { getResearchWork, getResearchWorks, researchWorks }
export type { ResearchMetric, ResearchSection, ResearchWork }
