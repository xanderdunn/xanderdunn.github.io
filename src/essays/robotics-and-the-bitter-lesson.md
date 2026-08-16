---
title: "Robotics and the Bitter Lesson"
description: "Deep learning + robotics hasn't lived up to its promise since 2015, but this time might be different."
author: "Xander Dunn"
date: 2024-01-01
displayDate: "1 January 2024"
permalink: /robotics-and-the-bitter-lesson/index.html
layout: essay.njk
tags: essay
---
### Robotics Hasn't Lived Up to the Hope (Yet)

In 2014 I was working at Apple on iOS and the first version of watchOS when I saw DeepMind's Atari results making headlines. At that moment I decided AI was the future and focused my career on it. In 2015 I joined [Osaro](https://osaro.com/), a deep RL for robotics startup. At the time I told my friends Osaro or a company like it would be worth as much as Twitter within 5 years. That did not happen! I don't believe there is any robot intelligence company that has rivaled Twitter in value at any point in time since 2015 ($10B-60B). Unlike text, audio, and image, AI for robotics has not had a breakout moment with proliferating use cases.

When discussing intelligent robots, many are quick to bring up Boston Dynamics. As far as I can tell, Boston Dynamics robots have no intelligence. Boston Dynamics built some interesting hardware and has some classical methods of stabilization. Some are quick to defend, "Well that's the hard part." Clearly, it isn't the hard part, or robotics would be solved and useful and we would see these robots everywhere in our daily lives. By definition, the hard part is whatever no one can do yet. Boston Dynamics has failed to meet market success and it's being passed around like a hot potato: Google bought it in 2013, sold it to SoftBank in 2017, and then SoftBank sold it to Hyundai in 2020. Boston Dynamics produces cool-looking hard-coded demos but has achieved very few use cases.

At Osaro we were working with KUKA iiwa industrial robot arms to perform pick and place tasks with the goal of industrial manufacturing automation. We quickly realized that data was a limiting factor and started using imitation learning. A human with a PlayStation controller would manually control the robot to complete tasks. The model would be trained on these trajectories, and it would indeed generalize to new situations. This approach remained data-limited because it required human-in-the-loop data collection, and the data samples were specialized trajectories involving the control of a robot with non-intuitive motion. We briefly pursued simulation as another avenue for overcoming data limitations but didn't sufficiently focus on it to benefit at scale. The sim2real step of transferring simulated learnings into physical world action requires effort to make the simulated data useful.

![](/assets/robotics-and-the-bitter-lesson/65973d806cad0344e9d42b64_6596f8c015e5d974212a3460_IMG_0071-6805f99a.jpeg)

<figcaption>KUKA iiwa robot arm I&nbsp;was working with, 2016</figcaption>

I think the wall we're hitting here is [Sutton's Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html): Scale is the secret ingredient to getting our state-of-the-art learning algorithms to work well. We can't have scale without data, and the physical world is really slow and expensive at producing data. chatGPT has the entire Internet of text to learn from. Midjourney and DALL·E have the entire Internet of images to learn from. Every hour of every day, billions of Internet-connected humans are generating new data for these models to learn from. These truly massive datasets allow training truly massive language models. All of the spaces where AI has achieved breakout usage have been built on the backs of massive datasets. But in robotics, we don't have billions of people generating data on how a robot should move and behave in the world. We don't have massive robotics control datasets.

Across the board, the robot intelligence industry has hit these walls and scaled back research and funding. In 2021, [OpenAI completely abandoned all robotics research](https://www.therobotreport.com/openai-abandons-robotics-research/). Amazon [abandoned its home delivery robot](https://techcrunch.com/2022/10/07/amazon-scales-back-scout-delivery-robot-program/). Amazon [axed its re:MARS](https://www.cnbc.com/2023/06/16/amazon-remars-robotics-and-ai-conference-not-happening-in-2023.html) robotics and AI conference. Google's industrial robotics company [Intrinsic is laying people off](https://9to5google.com/2023/01/11/alphabet-layoffs/). New LLM companies just a couple of months old are [raking in hundreds of millions of dollars](https://techcrunch.com/2023/12/11/mistral-ai-a-paris-based-openai-rival-closed-its-415-million-funding-round/) with below-SOTA results and murky business models. Meanwhile, robotic intelligence companies are doing layoffs, tightening belts, and struggling to get funding.

As a result of these challenges, it has become widely believed among deep learning researchers that physical embodiment may be the last thing that AI conquers. A common line of thought is that it may be easier to train an AI that can write code to control a robot than it is to train an AI directly on robot control.

### A New Path

#### 1) Integrated Hardware <> Software

Historically most of the robotics + AI companies, including Osaro, have focused solely on the software and left the hardware to someone else to figure out, or vice versa. Right now, there's a wave of companies that are attempting to tackle both problems. Tesla is particularly advantaged here because they have experience building Autopilot, which is the world's most abundant physically embodied AI. Boston Dynamics may have some of the best hardware people in the world, but they definitely do not have some of the best AI researchers in the world. Tesla is the very rare place that has both. Other companies working in this direction include [Figure](https://www.figure.ai/) and [1X Technologies](https://www.1x.tech/), which OpenAI invested in. At Osaro when we encountered a limitation with the hardware, cost, or hardware drivers, we had to accept it as fact. These vertically integrated companies can directly adapt their hardware to the needs of their software, which means the hardware is actually made for the AI that's running it.

![](/assets/robotics-and-the-bitter-lesson/6596fc06f5206220041fcc1c_GCtkIgYboAADsD1-60bfdce5.jpeg)

<figcaption>Tesla's <a href="https://www.youtube.com/watch?v=1xChD-gv_pc">vertically integrated robots</a> &amp;&nbsp;AI. The company making the AI&nbsp;is the company making the hardware. This bi-directional tight feedback loop helps. Tesla has taken vertical integration to an extreme, they even make their own batteries and chips.</figcaption>

It's important not just to collect lots of data, but to collect the right data. Given insufficient hardware sensors, it's possible to collect an enormous amount of data that is ultimately unlearnable. When the data itself conflicts on what action to take given the same inputs, a model can correctly learn high uncertainty and do nothing. This makes the feedback loop between hardware design and AI training critical. Designing the right hardware to make the data learnable is necessary for overcoming the aleatoric noise in physical world interaction.

#### 2) Foundation Models

One of the revelations in deep learning over the past couple of years has been the value of foundation models. If we pre-train a language model on massive amounts of text, we find that this pre-trained model can generalize to new language tasks very readily. With in-context learning or finetuning, we get state-of-the-art, useful performance on nearly any language task with just a few examples of the new task we're trying to solve. This has greatly improved the data efficiency of deep learning for many NLP use cases. The same is true for images and audio. Our own experience training LLMs on 8,000 hardware accelerators show impressive generalization and fine-tuning capabilities, but data quality remains important. Now research is focused on applying the same insights to robotics. These recent papers have shown some success in applying the foundation model approach to robotics:

##### [PALM-E](https://palm-e.github.io/), March 2023, Google

-   Model: 540B LLM + 22B ViT as PaLM-E-562B, then trained on robotics data, either end-to-end or with a frozen LLM.

![](/assets/robotics-and-the-bitter-lesson/6599b1375ad3bf2497ffcbc4_IMG_0090-3e20d0e0.jpeg)

<figcaption>Examples of natural language to robot control with PALM-E</figcaption>

-   Generalization: "\[F\]inetuned PaLM-E on 100 different long horizon tasks with **a single training example each**, e.g. “put all the blocks in the center”, “remove the blue blocks from the line”. We additionally see that PaLM-E can **generalize zero-shot to tasks involving novel object pairs** and to tasks involving objects that were unseen in either the original robot dataset or the ﬁnetuning datasets, e.g. a toy turtle."
-   Robotics data constraint: "Compared to available massive language or vision-language datasets, **robotics data is signiﬁcantly less abundant**. As discussed in the last paragraph, our model exhibits transfer, which aids PaLM-E to solve robotics tasks from very few training examples in the robotics domain, e.g. between 10 and 80 for Language Table or 320 for TAMP"

##### [RT-2](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/), July 2023, DeepMind

-   Model:  RT-2-PaLI-X and RT-2-PaLM-E
-   They introduce vision-language-action models (VLA): express the actions as text tokens and incorporate them directly into the training set of the model in the same way as natural language.

![](/assets/robotics-and-the-bitter-lesson/6599af7eb996a238587bee1f_IMG_0091-5e201c38.jpeg)

<figcaption>Robot actions are tokenized like text</figcaption>

-   Robotics data constraint: "While a brute force approach might entail collecting millions of robotic interaction trials, the most capable language and vision-language models are trained on billions of tokens and images from the web – **an** **amount unlikely to be matched with robot data in the near future**"

-   The importance of scale, starting with pre-trained foundation models: "\[W\]e observe that **training a very large model from scratch results in a very poor performance** even for the 5B model. Given this result, we decide to skip the evaluation of an even bigger 55B PaLI-X model when trained from scratch. Second, we notice that co-ﬁne-tuning a model (regardless of its size) results in a better generalization performance than simply ﬁne-tuning it with robotic data. We attribute this to the fact that keeping the original data around the ﬁne-tuning part of training, allows the model to not forget its previous concepts learned during the VLM training. Lastly, somewhat unsurprisingly, we notice that **the increased size of the model results in a better generalization performance**."
-   Generalization limitation: "\[A\]lthough we show that including web-scale pretraining via VLMs boosts generalization over semantic and visual concepts, the robot does not acquire any ability to perform new motions by virtue of including this additional experience. **The model’s physical skills are still limited to the distribution of skills seen in the robot data**, but it learns to deploy those skills in new ways"
-   Humanoid form factor learning: "An exciting direction for future work is to study how new skills could be acquired through **new data collection paradigms such as videos of humans**."

##### [Foundation Models in Robotics](https://arxiv.org/abs/2312.07843), Dec 2023, various universities + NVIDIA + DeepMind

-   An overview of the field
-   Generalization: "Foundation models are crucial in tackling data scarcity in robotics. They offer a robust basis for **learning and adapting to new tasks with minimal specific data**. For example, recent methods utilize foundation models to generate data to help with training robots, such as robot trajectories and simulation. These models excel in learning from a small set of examples, allowing robots to quickly adapt to new tasks using limited data. From this perspective, **solving data scarcity is equivalent to solving the generalization ability problem in robotics**."

##### [Toward General Purpose Robots via Foundation Models](https://arxiv.org/abs/2312.08782), Dec 2023, various universities + Meta + DeepMind

-   An overview of the field

##### [AutoRT](https://deepmind.google/discover/blog/shaping-the-future-of-advanced-robotics/), January 2024, DeepMind

-   This paper explores how a collection of robots might autonomously discover tasks and execute them to collect diverse data. See the video [here](https://auto-rt.github.io/). It's essentially an autonomous exploration protocol that may also help with breaking through robotic data limitations.

Foundation models are not without their own challenges, of course:

-   Uncertainty: LLMs are famous for their hallucinations. When chatGPT hallucinates it's usually funny or temporarily misleading. When a robot with many times the strength of a human hallucinates, it may be deadly. One example here would be Autopilot's decision to disengage and rely on the human driver when it's uncertain.
-   Inference Costs: With scale comes cost, both in terms of actual dollars spent on hardware, but also in terms of inference time. The time it takes to run feed-forward inference on a 540B model is a challenge for real-time control in the physical world. One response to this is just "Moore's Law." A stronger response is quantization, distillation, student/teacher, etc. Here, again, Tesla's hardware+software integration may help immensely. Their custom chips optimized to run their in-house models in real-time have worked well for Autopilot.

The holy grail is a pre-trained robot that can generalize to new tasks with either in-context learning or minor fine-tuning on a few human demonstrations. The use of pre-trained vision and language models is a good start. The next step requires a progressively growing dataset from robot interactions.

I'm not the first to describe robot intelligence in terms of a Bitter Lesson data limitation that might be lifted by foundation models. See also Karol Hausman making this point [here](https://x.com/hausman_k/status/1612509549889744899?s=20https://x.com/hausman_k/status/1612509549889744899?s=20), a DeepMind coauthor on several of the papers listed above.

#### 3) Form Factor: Humanoid

The form factor of the humanoid with hands and fingers could be incredibly important for breaking through the data limitation of the physical world. I expect that (human video demonstration) → (industrial robot control) is solvable, but much more challenging than (human video demonstration) → (humanoid robot control). In the latter case, there's a direct mapping between digits, size, movements, and positions. As an example, Autopilot intervention data is a close 1:1 mapping: if the human pushes the brake, then the AI should push the brake. Unlike an industrial robot arm, a humanoid robot has a close mapping to human action: if the human puts two fingers here and three fingers there, then the robot should do the same. This potentially reduces the difficulty of the problem down to [animation retargeting](https://docs.unrealengine.com/4.26/en-US/AnimatingObjects/SkeletalMeshAnimation/AnimationRetargeting/). There are of course plenty of edge cases and exceptions. A classic Autopilot exception is humans rolling through stop signs rather than fully coming to a stop. On the whole, the mapping from human actions to human-like robot actions is much clearer than human actions to very inhuman robot actions.

On our way to the holy grail of real-time in-context learning from human example, we need to pursue paths to  produce many orders of magnitude more robotics data than we've seen to date. The ability for a human to naturally demonstrate how to perform the task helps with collecting the scale of data required. It is challenging work to control a robot with completely different digits to perform a task, but any factory line worker or person doing the dishes could put on the equipment necessary to record all their movements in a way that is immediately operable by the robot of the same form factor. Autopilot is a great example of this gradual approach. Autopilot was first released with mediocre performance and the human driver did most of the work. Slowly over time, the human intervention data is collected into a massive dataset that continuously improves Autopilot. We could imagine a similar feedback loop of human intervention <> humanoid robot.

![](/assets/robotics-and-the-bitter-lesson/65973c4b6cad0344e9d32733_Screenshot-2024-01-04-at-15.15.31-ac48f8c9.png)

<figcaption>No hand-held PlayStation remotes. Human form-factor control, perform the action exactly as you naturally would.</figcaption>

![](/assets/robotics-and-the-bitter-lesson/65973caaf748882e1870ffb4_Screenshot-2024-01-04-at-15.17.35-3df620a6.png)

<figcaption>I'm particularly interested in the finger data capture. From <a href="https://www.youtube.com/watch?v=XiQkeWOFwmk">here</a>. A critical limiting factor will be the dexterity and sensor resolution of these small digits. The incredible nature of human fingers is likely one of the catalysts for the Anthropocene. The resolution of the sensors on the fingers of the robots are probably vital to overcoming the problem of aleatoric noise.</figcaption>

If we achieve the holy grail of a pre-trained robot that can learn how to perform new tasks from a video of a human, then we may have a chance of breaking through the wall of the Bitter Lesson. We might then have billions of people generating useful data for robots every hour of every day simply by going about their daily lives in the physical world.

Of course, a humanoid form factor isn't likely to be optimal for performing every task, but ultimately the hardware that unlocks a flood of data will be the one that's most useful.

#### The New Ingredients

-   Vertical integration: Custom hardware from hardware companies, like Tesla, who are also building the intelligence
-   Foundation models (language, vision)
-   Humanoid form factor with natural demonstrations. Initially, this allows for more data collection and a slow hand-off from human control to robot control. Eventually, it allows learning in real-time from seeing a human perform a task in person.

One of the pitfalls AI must avoid is the allure of replacing a small number of minimum wage jobs. The economics don't work out. If it takes $20B of R&D to make an intelligent robot product, how do we ever expect to make that back by replacing a small number of $14/hr jobs? Early deep RL was extremely good at playing video games and many people wanted to sell it to video game companies for QA testing. This is a dreadful business idea because there are millions of people willing to playtest unreleased video games for little more than a donut and some swag. Likewise, I'm uncertain how economical it is to focus on replacing low-wage, low-skill factory line work. I don't know what business ambitions Tesla Bot and other humanoid robots have.

The above-outlined approach is by no means a straight shot to success. It remains to be seen that the Bitter Lesson can finally be overcome with sufficient amounts of data of sufficient quality on real-world actions. It remains to be seen that in-context learning successfully solves a new task on a pre-trained robot. It's always very difficult to predict timelines, but I'm optimistic this cycle in robotics will produce some useful and scalable applications.
