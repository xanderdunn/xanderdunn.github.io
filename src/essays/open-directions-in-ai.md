---
title: "Open Directions in AI / What's Missing from AI"
description: "An overview of some missing capabilities from current frontier models"
author: "Xander Dunn"
date: 2025-03-19
displayDate: "19 March 2025"
permalink: /open-directions-in-ai/index.html
layout: essay.njk
tags: essay
---
> What are the most important problems in your field and why aren't you working on them? - [Richard Hamming](https://www.lesswrong.com/posts/P5k3PGzebd5yYrYqd/the-hamming-question)

Today's AI is rife with dichotomies. Our frontier models achieve PhD-level performance on some academic benchmark tests. They rank as the 175th best competitive programmer in the world. But these same models fall flat on really basic tasks. Our best models [haven't learned the formula for fundamental arithmetic](https://x.com/yuntiandeng/status/1889704768135905332). Models [get worse the more they think about some problems](https://claude.ai/share/b893abd8-94e4-4625-a7ae-68aa32737af2). I have an "elite coder" on my laptop, but still no robot in my house that can open my refrigerator door, and it's not a hardware limitation. Supposedly nearly all code will soon be written by AI, but everyone is still at a shortage of great engineers. In no particular order, here are some capabilities we're missing:

-   [AlphaProof Team member](https://www.youtube.com/watch?v=uX6ceY1vcUg): "These machines don't have their own notion of what questions are interesting."
-   The way our current models learn is like asking a friend to answer everything for them. We lack models that learn everything they need to know simply from interacting with the world. Training on everything everyone has ever said is like asking every friend in the world. Asking a friend isn't intelligence. What would an AI look like that could simply learn all it needs to learn through direct interaction with the world?
-   What model will be able to do well on the ARC Prize without training on any ARC samples? Human intelligence is interesting because we can do well on ARC without having ever seen any data samples. It’s tough to say that LLMs generalize because they’re trained on everything.
-   We are lacking agency, planning, and correctness verification.
    -   LLMs are not good at verifying the correctness of their outputs. [See Rich Sutton](http://incompleteideas.net/IncIdeas/KeytoAI.html) on this topic in 2001.
    -   Planning requires long time horizon consistency. A human can plan to buy a house in 20 years and make it happen.
-   [Satya Nadella](https://www.youtube.com/watch?v=4GLSzuYXh6w): AI has not yet had consequential economic impact.

-   We lack sample efficiency
    -   Yann LeCun: It would take a human thousands of years to read everything transformers are trained on. It takes a teenager just a few hours to become good at driving. Why don't we have an AI that can learn to drive in 20 hours of practice without killing itself?
    -   [Suchir Balaji](https://docs.google.com/document/d/1ItRqrpgQHJ05rQx0zc26t1_NgpUcw3znwTWpXxqH8uI/edit?tab=t.0#heading=h.qslpqdtnxw1r): Intelligence is sample efficiency.
    -   Is it possible we lack sample efficiency simply because we need a base model with the equivalent of 100M years of evolutionary discovery? How much of human sample efficiency is due to evolution shaping our brains? Will a model with sufficient number of neurons and sufficient number of training flops be able to learn how to drive with 20 hours of driving experience?
-   [Ilya Sutskever](https://www.youtube.com/watch?v=1yvBqasHLZs)
    -   Agency. Do we expect this to emerge from LLMs + sufficient RL post-training?
    -   Reasoning - will produce unpredictable (creative) outputs. Geoffrey Hinton, Feb 2025: "It's got the potential to be extremely creative, but I agree it's not there yet."
    -   Self-awareness. We are a part of our own world model, AIs will see themselves as part of their own world model.
-   [Dwarkesh Patel](https://x.com/RichardSocher/status/1888224970637005263): AIs are not making new discoveries.
    -   Ashish Vaswani: Forget new knowledge creation, our existing models don't have the ability to determine if our existing knowledge is consistent.
-   [Jeff Dean](https://www.youtube.com/watch?v=v0gjI__RyCY)
    -   Unlimited context windows. Want to attend to trillions of tokens. Could it attend to every email and message and photo you've ever had and use that?
    -   Continual learning rather than starting over.
    -   Sparsity. Different parts of a model better at different things, so that we can activate a small part of the model at inference time based on the task.
    -   Organically growing models. MoE is a step in that direction. Want to grow experts in certain areas as needed.
    -   Better pre training algorithms. Maybe we should think a lot harder about some tokens rather than treating everything equally.
    -   Pre-training may not be dead even if we've run out of data: Pre-train a hundred epochs over the world's text data and use dropout
-   Joscha Bach
    -   We need more people working on consciousness. To understand it with machine intelligence.
    -   We don't have an AI that can recreate itself. What minimal thing do you need on a lonely island to recreate yourself? A lonely island could be a GPU, for example.
-   [Vincent Vanhoucke](https://open.spotify.com/episode/0qn0RUBvkLqtJxlxwHOyXt)
    -   Controllable world modeling with realistic physics and causality. Would be very useful for long tail event simulation but we tend to be worst at generating long tail events realistically.
    -   We're still lacking good sim2real for tactile control, like grasping. The transfer from simulation to real world does not work well.

-   [Yann LeCun](https://open.spotify.com/episode/2mOKCpKSUdaLkFPz8Shgbp?si=Xq-9IBn-Rky9pQEbJlFqOQ&context=spotify%3Aplaylist%3A37i9dQZF1FgnTBfUlzkeKt):
    -   For human-level AI we are lacking 4 characteristics: understanding the physical world, ability to reason, ability to plan, and persistent memory
    -   [JEPA](https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/), [VICReg](https://arxiv.org/abs/2105.04906), [DINO](https://arxiv.org/html/2411.04983v1)
    -   We need architectures with search built into them. With existing LLMs we have to bolt search on top of them after the fact.
-   [Andrej Karpathy](https://x.com/karpathy/status/1891724502251327675): Current models lack the ability to produce good humor.
    -   No model can write an original standup set that is hilarious. Even better - a model that can _deliver_ a standup set that is hilarious.
-   We are lacking a theory of intelligence, or a theory of deep learning. When a particular change improves performance, we have at best loose intuitions for why that may be.
    -   [Noam Shazeer](https://www.youtube.com/watch?v=atMRWzgHEGg) points out that AI is like 15th century alchemy: We just try things and experimentally discover what works.

![](/assets/open-directions-in-ai/67dbabd57a887e21eda081bd_Screenshot-2025-03-19-at-19.46.28-902efb5f.png)

<figcaption>An example of alchemy, from <a href="https://arxiv.org/pdf/2002.05202">Shazeer's paper</a></figcaption>
