const mockData = {
  user: {
    name: "Mohamed",
    streak: 6,
    xp: 1265,
    level: 7,
    studyMinutes: 385,
    dailyGoal: 45,
    email: "mohamed@example.com",
    learningLevel: "Intermediate",
  },
  course: {
    title: "Computer Vision Fundamentals",
    progress: 64,
    topicsCompleted: 8,
    totalTopics: 12,
    avgScore: 82,
    learningTime: "6h 25m",
  },
  documentLibrary: [
    {
      id: "cv-fundamentals",
      name: "Computer Vision Fundamentals.pdf",
      pages: 148,
      uploadDate: "Aug 28, 2026",
      progress: 64,
      topics: 12,
      size: "18 MB",
    },
    {
      id: "ml-basics",
      name: "Machine Learning Basics.pdf",
      pages: 96,
      uploadDate: "Aug 16, 2026",
      progress: 41,
      topics: 9,
      size: "12 MB",
    },
    {
      id: "dl-intro",
      name: "Deep Learning Introduction.pdf",
      pages: 132,
      uploadDate: "Aug 04, 2026",
      progress: 27,
      topics: 7,
      size: "16 MB",
    },
  ],
  recentActivity: [
    { title: "Completed 'Image Filtering'", time: "4 hours ago" },
    { title: "Scored 90% on 'Edge Detection Quiz'", time: "Yesterday" },
    { title: "Studied 'Convolution'", time: "Yesterday" },
    { title: "Asked AI about 'Gaussian Blur'", time: "2 days ago" },
  ],
  topics: [
    {
      id: "computer-vision",
      title: "Computer Vision",
      parentId: null,
      status: "current",
      progress: 64,
      difficulty: "Foundation",
      duration: "12 min",
      explanation: "The field of teaching machines to interpret and understand visual data from images and videos.",
      objectives: [
        "Define computer vision and its use cases",
        "Recognize image representation basics",
        "Connect perception tasks to learning pipelines",
      ],
      prerequisites: ["Linear algebra", "Basic Python"],
      keyConcepts: ["Pixels", "Color channels", "Feature extraction"],
      children: [
        {
          id: "image-processing",
          title: "Image Processing",
          parentId: "computer-vision",
          status: "completed",
          progress: 100,
          difficulty: "Beginner",
          duration: "15 min",
          explanation: "Image processing uses mathematical transforms to improve, restore, or analyze visual information.",
          objectives: ["Apply filters to images", "Understand brightness and contrast", "Use histogram-based adjustments"],
          prerequisites: ["Pixel basics"],
          keyConcepts: ["Filtering", "Histogram", "Contrast"],
          children: [
            { id: "pixels", title: "Pixels", status: "completed", progress: 100 },
            { id: "color-models", title: "Color Models", status: "completed", progress: 100 },
            { id: "image-filtering", title: "Image Filtering", status: "current", progress: 65 },
            { id: "histograms", title: "Histograms", status: "available", progress: 35 },
          ],
        },
        {
          id: "image-enhancement",
          title: "Image Enhancement",
          parentId: "computer-vision",
          status: "available",
          progress: 22,
          difficulty: "Intermediate",
          duration: "16 min",
          explanation: "Enhancement techniques improve the visual quality of an image before analysis or interpretation.",
          objectives: ["Increase contrast", "Reduce noise", "Improve feature visibility"],
          prerequisites: ["Image processing fundamentals"],
          keyConcepts: ["Contrast", "Sharpening", "Noise reduction"],
          children: [
            { id: "contrast", title: "Contrast", status: "available", progress: 24 },
            { id: "histogram-equalization", title: "Histogram Equalization", status: "available", progress: 18 },
            { id: "noise-reduction", title: "Noise Reduction", status: "available", progress: 16 },
          ],
        },
        {
          id: "edge-detection",
          title: "Edge Detection",
          parentId: "computer-vision",
          status: "available",
          progress: 42,
          difficulty: "Intermediate",
          duration: "20 min",
          explanation: "Edge detection highlights boundaries and structural changes in an image to isolate objects and features.",
          objectives: ["Understand gradients", "Detect intensity transitions", "Compare edge operators"],
          prerequisites: ["Image filtering"],
          keyConcepts: ["Sobel", "Canny", "Gradient magnitude"],
          children: [
            { id: "sobel", title: "Sobel", status: "available", progress: 44 },
            { id: "prewitt", title: "Prewitt", status: "available", progress: 29 },
            { id: "canny", title: "Canny", status: "available", progress: 20 },
          ],
        },
        {
          id: "feature-detection",
          title: "Feature Detection",
          parentId: "computer-vision",
          status: "available",
          progress: 12,
          difficulty: "Advanced",
          duration: "22 min",
          explanation: "Feature detection identifies distinctive patterns like corners or textures that support recognition tasks.",
          objectives: ["Recognize keypoints", "Interpret descriptors", "Map features to object recognition"],
          prerequisites: ["Edge detection"],
          keyConcepts: ["Corners", "Descriptors", "SIFT"],
          children: [
            { id: "corners", title: "Corners", status: "available", progress: 16 },
            { id: "sift", title: "SIFT", status: "locked", progress: 0 },
            { id: "feature-descriptors", title: "Feature Descriptors", status: "locked", progress: 0 },
          ],
        },
        {
          id: "machine-learning",
          title: "Machine Learning",
          parentId: "computer-vision",
          status: "locked",
          progress: 0,
          difficulty: "Advanced",
          duration: "25 min",
          explanation: "Machine learning methods allow models to learn patterns from labelled data and generalize to new inputs.",
          objectives: ["Relate visual features to model inputs", "Understand learning objectives", "Assess model performance"],
          prerequisites: ["Feature detection"],
          keyConcepts: ["Classification", "CNN", "Object detection"],
          children: [
            { id: "classification", title: "Classification", status: "locked", progress: 0 },
            { id: "cnn", title: "CNN", status: "locked", progress: 0 },
            { id: "object-detection", title: "Object Detection", status: "locked", progress: 0 },
          ],
        },
      ],
    },
  ],
  lessons: [
    {
      id: "image-filtering",
      title: "Image Filtering",
      difficulty: "Intermediate",
      duration: "18 min",
      progress: 65,
      summary: "Learn how filters modify image neighborhoods and remove unwanted noise or sharpen structure.",
      objectives: ["Understand the kernel concept", "Explain convolution", "Differentiate blur and sharpening filters"],
      prerequisites: ["Pixels", "Color models"],
      keyConcepts: ["Kernel", "Convolution", "Gaussian blur", "Median filter"],
      content: `
        <section class="lesson-section">
          <h3>Overview</h3>
          <p>Filtering is a core operation in computer vision where a small matrix, often called a kernel, is applied to each image region to produce a transformed output. The result can be smoothing, sharpening, denoising, or edge enhancement.</p>
        </section>
        <section class="lesson-section">
          <h3>Why filtering matters</h3>
          <p>Filters are used to reduce random noise, emphasize structure, and prepare images for further tasks such as segmentation, object detection, and classification. A well-chosen filter can make downstream algorithms far more reliable.</p>
        </section>
        <section class="lesson-section">
          <h3>The kernel concept</h3>
          <p>A kernel is a small matrix that slides across the image. At each position, it multiplies the values around the current pixel and sums them to calculate the new pixel intensity.</p>
          <div class="code-block">
            <div>3 × 3 Kernel</div>
            <div>[ 1  1  1 ]</div>
            <div>[ 1  1  1 ]</div>
            <div>[ 1  1  1 ]</div>
          </div>
        </section>
        <section class="lesson-section">
          <h3>Convolution</h3>
          <p>Convolution is the process of moving the kernel across the entire image. Each pixel is replaced by a weighted sum of its neighboring pixels, which creates blur, sharpening, or edge responses depending on the kernel values.</p>
          <div class="callout">
            <strong>Example:</strong> A Gaussian kernel softly emphasizes neighboring intensities to smooth noise while preserving broader structures.
          </div>
        </section>
        <section class="lesson-section">
          <h3>Gaussian blur</h3>
          <p>Gaussian blur uses a weighted kernel where the center contributes the most and surrounding pixels contribute less. This is especially useful for reducing high-frequency noise before edge detection.</p>
        </section>
        <section class="lesson-section">
          <h3>Median filter</h3>
          <p>Median filtering is effective when removing salt-and-pepper noise. It replaces each pixel with the median value in its neighborhood, preserving edges while removing isolated spikes.</p>
        </section>
        <section class="lesson-section">
          <h3>Applications</h3>
          <p>Image filtering is used in enhancement pipelines, pre-processing for computer vision models, medical imaging, satellite image analysis, and photo editing.</p>
        </section>
      `,
    },
    {
      id: "histograms",
      title: "Histograms",
      difficulty: "Beginner",
      duration: "12 min",
      progress: 35,
      summary: "Understand how brightness distribution helps with image analysis and enhancement.",
      objectives: ["Interpret histogram shape", "Identify brightness shifts", "Improve image contrast"],
      prerequisites: ["Pixels"],
      keyConcepts: ["Intensity distribution", "Contrast", "Equalization"],
      content: `
        <section class="lesson-section">
          <h3>Histogram Basics</h3>
          <p>A histogram describes how frequently each intensity value appears in an image. It gives a compact view of brightness and contrast.</p>
        </section>
        <section class="lesson-section">
          <h3>When to use it</h3>
          <p>Histograms are used to diagnose exposure issues, adjust contrast, and prepare images for segmentation and feature extraction.</p>
        </section>
      `,
    },
    {
      id: "edge-detection",
      title: "Edge Detection",
      difficulty: "Intermediate",
      duration: "20 min",
      progress: 42,
      summary: "Discover how edge detectors identify boundaries and transitions within an image.",
      objectives: ["Explain gradients", "Compare Sobel and Canny", "Recognize edge response"],
      prerequisites: ["Image filtering"],
      keyConcepts: ["Gradient", "Thresholding", "Boundary detection"],
      content: `
        <section class="lesson-section">
          <h3>Edges</h3>
          <p>Edges occur where pixel intensities change sharply. They often mark object boundaries, material transitions, or texture changes.</p>
        </section>
        <section class="lesson-section">
          <h3>Sobel and Canny</h3>
          <p>Sobel approximates gradients using small kernels, while the Canny detector adds Gaussian smoothing and non-maximum suppression to isolate cleaner edges.</p>
        </section>
      `,
    },
  ],
  progressData: {
    overallCompletion: 74,
    topicsCompleted: 8,
    totalTopics: 12,
    quizAverage: 82,
    learningTime: "6h 25m",
    currentStreak: 6,
    weeklyActivity: [
      { day: "Mon", value: 30 },
      { day: "Tue", value: 54 },
      { day: "Wed", value: 72 },
      { day: "Thu", value: 48 },
      { day: "Fri", value: 88 },
      { day: "Sat", value: 64 },
      { day: "Sun", value: 79 },
    ],
    strongestTopics: [
      { name: "Image Processing", score: 94 },
      { name: "Color Models", score: 91 },
      { name: "Edge Detection", score: 86 },
    ],
    needsImprovement: [
      { name: "Feature Descriptors", score: 58 },
      { name: "Object Detection", score: 61 },
      { name: "Noise Reduction", score: 63 },
    ],
    dailyGoal: "45 min/day",
    sessionsThisWeek: 5,
    focusTime: "3h 15m",
  },
  quizQuestions: [
    {
      question: "What is the primary purpose of a Gaussian filter?",
      options: ["Detect corners", "Reduce image noise", "Segment objects", "Detect objects"],
      answerIndex: 1,
      explanation: "A Gaussian filter smooths the image by averaging nearby intensities, which reduces high-frequency noise and preserves broad structure.",
      topic: "Image Filtering",
    },
    {
      question: "Which operation is used to highlight image boundaries by calculating intensity gradients?",
      options: ["Histogram equalization", "Edge detection", "Color quantization", "Thresholding"],
      answerIndex: 1,
      explanation: "Edge detection estimates gradients to find locations where pixel intensity changes rapidly, which usually indicates boundaries.",
      topic: "Edge Detection",
    },
    {
      question: "What does a 3 x 3 kernel represent in image filtering?",
      options: ["A color palette", "A region of pixels used for convolution", "A label map", "A training example"],
      answerIndex: 1,
      explanation: "The kernel is a small matrix that slides across the image and computes a new value from the neighboring pixels in that local region.",
      topic: "Image Filtering",
    },
    {
      question: "Which filter is commonly used to remove salt-and-pepper noise?",
      options: ["Median filter", "Sobel filter", "Sharpening filter", "Canny filter"],
      answerIndex: 0,
      explanation: "Median filtering replaces each pixel with the median value from its neighborhood, which is effective against isolated noisy pixels.",
      topic: "Image Enhancement",
    },
    {
      question: "How does a histogram help in image analysis?",
      options: ["It tracks a model's training loss", "It shows intensity distribution", "It stores color labels", "It measures feature covariance"],
      answerIndex: 1,
      explanation: "A histogram displays how often each intensity value occurs, helping you understand brightness, contrast, and exposure characteristics.",
      topic: "Image Processing",
    },
    {
      question: "What is the main difference between Sobel and Canny edge detection?",
      options: ["One creates a 3D map, the other creates a heatmap", "Canny adds smoothing and edge thinning", "Sobel works only in grayscale", "Canny is used for color spaces only"],
      answerIndex: 1,
      explanation: "Canny builds on gradient-based detection with Gaussian smoothing, non-maximum suppression, and thresholding for cleaner, more precise edges.",
      topic: "Edge Detection",
    },
    {
      question: "In computer vision, a pixel is best described as:",
      options: ["A neural network layer", "The smallest unit of a digital image", "A detected object boundary", "A feature descriptor"],
      answerIndex: 1,
      explanation: "A pixel is the smallest discrete picture element in a digital image, and it stores intensity or color information.",
      topic: "Pixels",
    },
    {
      question: "What is a common use of contrast enhancement?",
      options: ["To change network architecture", "To improve visibility of image details", "To flip the image upside down", "To compute a confidence score"],
      answerIndex: 1,
      explanation: "Contrast enhancement spreads pixel intensities more evenly, making features easier to see and analyze.",
      topic: "Image Enhancement",
    },
    {
      question: "What does a feature descriptor capture?",
      options: ["The color of each pixel", "A pattern or structure around a keypoint", "The full image histogram", "A training dataset split"],
      answerIndex: 1,
      explanation: "A feature descriptor summarizes local visual characteristics around a detected point or region so it can be compared across images.",
      topic: "Feature Detection",
    },
    {
      question: "Which concept is most closely related to convolutional neural networks?",
      options: ["Kernel filters", "Text tokens", "Graph edges", "File compression"],
      answerIndex: 0,
      explanation: "CNNs use learnable filters, which are mathematically similar to kernels, to detect patterns such as edges and textures across an image.",
      topic: "Machine Learning",
    },
  ],
  chatResponses: {
    "explain convolution simply": "Think of convolution as a sliding window that looks at a small group of pixels, applies a weighted rule from a kernel, and computes a new value. This helps blur, sharpen, or detect patterns in an image.",
    "what's the difference between sobel and canny?": "Sobel is a simple gradient-based approach for edge detection, while Canny adds smoothing, thresholding, and edge thinning to produce cleaner and more precise boundaries.",
    "summarize this chapter": "This chapter focuses on image filtering, the role of kernels, and how different filters are used to reduce noise, enhance contrast, and prepare images for further analysis.",
    "give me an example of gaussian blur": "For example, a Gaussian blur with a 3x3 kernel can smooth high-frequency noise in a photograph while preserving the broader shapes of objects in the scene.",
    default: "I can answer questions based on the uploaded Computer Vision Fundamentals document. Try asking about filtering, edge detection, convolution, or Gaussian blur.",
  },
};

async function getDocument() {
  return Promise.resolve(mockData.documentLibrary[0]);
}

async function getTopics() {
  return Promise.resolve(mockData.topics);
}

async function getLesson(id) {
  const lesson = mockData.lessons.find((item) => item.id === id) || mockData.lessons[0];
  return Promise.resolve(lesson);
}

async function getQuizQuestions() {
  return Promise.resolve(mockData.quizQuestions);
}

async function getChatResponse(question) {
  const normalized = question.trim().toLowerCase();
  const direct = mockData.chatResponses[normalized];

  if (direct) {
    return Promise.resolve({
      text: direct,
      sources: [
        { title: "Computer Vision Fundamentals", chapter: "Chapter 4 · Image Filtering" },
      ],
    });
  }

  if (normalized.includes("gaussian") || normalized.includes("blur")) {
    return Promise.resolve({
      text: mockData.chatResponses["give me an example of gaussian blur"],
      sources: [
        { title: "Computer Vision Fundamentals", chapter: "Chapter 4 · Image Filtering" },
      ],
    });
  }

  if (normalized.includes("sobel") || normalized.includes("canny")) {
    return Promise.resolve({
      text: mockData.chatResponses["what's the difference between sobel and canny?"],
      sources: [
        { title: "Computer Vision Fundamentals", chapter: "Chapter 5 · Edge Detection" },
      ],
    });
  }

  if (normalized.includes("summary") || normalized.includes("summarize")) {
    return Promise.resolve({
      text: mockData.chatResponses["summarize this chapter"],
      sources: [
        { title: "Computer Vision Fundamentals", chapter: "Chapter 4 · Image Filtering" },
      ],
    });
  }

  return Promise.resolve({
    text: mockData.chatResponses.default,
    sources: [
      { title: "Computer Vision Fundamentals", chapter: "Chapter 4 · Image Filtering" },
    ],
  });
}

window.mockData = mockData;
window.getChatResponse = getChatResponse;
