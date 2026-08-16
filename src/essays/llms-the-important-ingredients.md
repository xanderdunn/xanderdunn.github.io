---
title: "LLMs: The Important Ingredients"
description: "An overview of the pieces coming together to make LLMs work."
author: "Xander Dunn"
date: 2023-01-27
displayDate: "27 Jan 2023"
permalink: /llms-the-important-ingredients/index.html
layout: essay.njk
tags: essay
---
This is a list of the ingredients I think are important right now for the improvement of LLMs. It's an overview of the literature on improving various aspects of Large Language Models. Reading a sampling of these will give a good understanding of current LLM capabilities and where engineering and research efforts are focused.

It's well known that papers often leave out important information for reproducing their results. This is often intentional and sometimes unintentional, sometimes information in the paper is mistakenly wrong. So, while this will give a good overview of the field, there is still a considerable gap between paper comprehension and being able to implement these methods to achieve similar results.

-   Scaling training. This is primarily a FLOPS constrained distributed systems problem. See [Megatron-LM](https://github.com/NVIDIA/Megatron-LM), [DeepSeed](https://github.com/microsoft/DeepSpeed). 
-   Scaling inference. Maximizing throughput, reducing costs, and maximizing GPU memory usage are important for making LLMs into viable products. See [Speculative Sampling](https://arxiv.org/abs/2302.01318), [Large Transformer Model Inference Optimization](https://lilianweng.github.io/posts/2023-01-10-inference-optimization/#architectural-optimization), and [FlexGen](https://github.com/Ying1123/FlexGen). 
-   Human preference alignment. [RLHF](https://arxiv.org/abs/2204.05862) / [RLAIF](https://www.interconnects.ai/p/beyond-human-data-rlaif).  See [InstructGPT](https://arxiv.org/abs/2203.02155), [Hindsight Finetuning](https://arxiv.org/abs/2302.02676), and [Pretraining with Human Preferences](https://arxiv.org/abs/2302.08582). See also [John Schulman's talk on RLHF](https://www.youtube.com/watch?v=hhiLw5Q_UFg), and [this](https://gist.github.com/yoavg/6bff0fecd65950898eba1bb321cfbd81) for motivation.
-   Increasing context window size. This is a very important, very active area of research. We're currently limited to 4000 tokens on [OpenAI's text-davinci-003](https://platform.openai.com/docs/models), but future models will have much larger context window sizes. See [FlashAttention](https://github.com/HazyResearch/flash-attention) and [Transformer-XL](https://arxiv.org/abs/1901.02860).
-   [Red Teaming](https://arxiv.org/abs/2209.07858): Evaluating models and weaknesses before deployment. 

-   Proficient Tool Use. See [Toolformer](https://arxiv.org/abs/2302.04761), [Cascades](https://arxiv.org/abs/2207.10342), and [Augmented Language Models](https://arxiv.org/abs/2302.07842)
-   Storage and retrieval across massive datasets using embeddings. This is one approach to dealing with the combined fact that re-training models on new data is slow and expensive combined with the very small context window size. It may be the case that retrieval will always be important for LLMs because the context window will never be large enough to fit millions of documents. See [RETRO](https://arxiv.org/abs/2112.04426).
-   Surfacing Uncertainty: Knowing how confident the model is in what it has done and conveying that to the user. See [Language Models (Mostly) Know What They Know](https://arxiv.org/abs/2207.05221)

-   Deployment and data flywheels. Improvement from human interaction. I'm increasingly of the conviction that we can't achieve human-level capabilities purely by training models in labs behind closed doors. I think direct human interaction is a vital part of learning what's useful to humans.

-   System 2 Thinking: Variable computation time. It's a strange thing that our current LLMs spend exactly the same amount of time on all questions, whether it's something simple or something extremely complex. It would make sense for models to expend greater computation on more complex queries, exactly as humans do. See [Universal Transformers](https://arxiv.org/abs/1807.03819), Adaptive Computation Time (ACT) (2016).
-   Bootstrapping: Using the currently trained model to generate enough new high quality training data via chain-of-thought + critic model to train the next iteration of the model. If this works, we could achieve escape velocity. See [Large Language Models Can Self Improve](https://arxiv.org/abs/2210.11610) and [STaR](https://arxiv.org/abs/2203.14465). Similarly, bootstrapping with code: Some way of exploring code, running code, modifying code, and learning from the execution of code. See [LEVER](https://arxiv.org/abs/2302.08468).

-   Planning / Monte Carlo Tree Search (MCTS). See [Adaptive Agents](https://arxiv.org/abs/2301.07608), [Go-Explore](https://arxiv.org/abs/1901.10995), and [Decision Transformer](https://arxiv.org/abs/2106.01345). 
-   Multimodal: Gain a grounded understanding from experience with types of data other than language. Yann LeCun is loudly beating his drum that LLMs need grounding through experience in media other than text. He would say that most knowledge is not contained within text. This is an active area of research. See [Language is Not All You Need](https://arxiv.org/abs/2302.14045).
