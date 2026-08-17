---
title: "Security of Software 1.0 vs 2.0"
description: "Traditional software security paradigms applied to deep learning"
author: "Xander Dunn"
date: 2023-02-04
displayDate: "4 Feb 2023"
permalink: /security-of-software-1-0-vs-2-0/index.html
layout: essay.njk
tags: essay
---
[Karpathy in 2017 defined](https://karpathy.medium.com/software-2-0-a64152b37c35) Software 1.0 as all of the algorithms we write with programming languages. These are systems that we can describe with code, whereas machine learning, and neural nets specifically, are algorithms we write to solve problems that we can't describe. This is Software 2.0. I find this analogy useful here where I attempt to apply Software 1.0 security paradigms, which have been developed over a handful of decades, to Software 2.0, which is a relatively new field of security application.

![A graph showing the complexity of software greatly increasing with Software 2.0 compared to Software 1.0.](/assets/security-of-software-1-0-vs-2-0/63e11a9b8952d64182781034_karpahty_complexity-43f842e6.jpg)

<figcaption>With great complexity comes great responsibility.</figcaption>

### Why Security?

Security is ultimately about getting software to not do things it's not supposed to do, hopefully without harming the software's ability to do the things it's supposed to do. In either Software 1.0 or 2.0, it's a mistake to view capabilities improvement ("adding features") as separate and unrelated to achieving security. In Software 1.0 we call this "shift left": attempting to incorporate security practices early in the software development lifecycle to prevent the need for more costly interventions later. **In Software 2.0, the security/alignment/reliability problem is the AGI problem. If today's language models were completely reliable, then they would already be AGI.**

### Securing Software 1.0 with Software 2.0

Ideas here take the form of, "can we find, fix, or exploit vulnerabilities with language models that understand code?" This is an extensive and worthwhile topic that I cover in [other places](https://docs.google.com/presentation/d/1XSxPfZpo_9h2G6ICYYf6BuMhBjQbAAtuAw_hRz94huY/edit?usp=sharing). For this specific article, however, I'm interested in the reverse: Apply Software 1.0 Security paradigm to Software 2.0, specifically Large Language Models.

### The Challenge of Securing Software 2.0

![Software Risk = Available Attack Surface * Complexity](/assets/security-of-software-1-0-vs-2-0/63df2bfb7fd0b7860f082bf5_IMG_4204-07a304aa.PNG)

<figcaption><a href="https://youtu.be/7Ysy6iA2sqA?t=2097">Mark Dowd at OffensiveCon 2022</a></figcaption>

One of the challenges of securing Large Language Models is that they have both a very large attack surface and very high complexity. LLMs take thousands of arbitrary bytes as input and produce thousands of arbitrary bytes as output, and the field's goal is to increase that to millions of arbitrary bytes. Some of those arbitrary outputs are code that's expected to be executed, either by an end-user or on a server. Further, anyone in the world can query this function. As far as attack surfaces go in software, this is a very large one. The complexity comes from the billions of neurons the models consist of. This makes them very difficult to inspect and understand (Although Chris Olah is [making early progress](https://transformer-circuits.pub/) here). Generally in Software 1.0 when a codebase becomes so large that it can't be inspected and understood, bugs and vulnerabilities abound.

![An example of chatGPT security being circumvented using base64](/assets/security-of-software-1-0-vs-2-0/63df257af46ebf1a09906fbd_Screenshot-2023-02-04-at-22.40.45-d8bba8fa.png)

<figcaption>Early versions of chatGPT&nbsp;and Claude suffered from a vulnerability where safety guardrails could be circumvented by encoding the prompt in base64. This is an example of the very large space of arbitrary byte inputs of the model and the difficulty of defending against all possible malicious inputs.</figcaption>

In some sense, the attack surface actually increases as the models become more capable. A less capable model might understand ASCII English but not base64, whereas the more capable model understands both and could have exploits in either encoding. Safety training in English does not appear to have generalized sufficiently well to English encoded in base64.

In Software 1.0, when we have a function that takes arbitrary inputs, we test the security of it via fuzzing. We take some good inputs and then randomly mutate them, very quickly testing many different inputs to see if any invariants fail. However, there are two important differences between the fuzzing of Software 1.0 vs. 2.0: 

-   Inference on these LLMs takes a long time and is expensive. It sometimes takes multiple seconds for the result of a chatGPT inference to stream in, and they're running on state-of-the-art server accelerators. In typical Software 1.0 fuzzing we would expect a single test case to take milliseconds on consumer hardware, allowing us to quickly and cheaply fuzz billions of possible inputs.
-   It's not easy to tell what bad output is. In a system that can be described (Software 1.0), we know an output is bad because we've written some assertion or property to test it. For example, perhaps a certain integer should never be less than 0. On the other hand, with Software 2.0 it can be quite difficult to test what bad output is. This is most often done by asking human evaluators to evaluate model outputs, which is neither easy nor scalable. To realize just how hard this is, consider the story told in the book [This is How They Tell Me the World Ends](https://www.amazon.com/This-They-Tell-World-Ends/dp/1635576059/ref=sr_1_1?crid=180BKX0TXFKBU&keywords=this+is+how+they+tell+me+the+world+ends&qid=1675648674&sprefix=this+is+how+they+tell+me+the+world+ends%2Caps%2C69&sr=8-1) where **three backdoors were introduced into a small C program, and then NSA experts were tasked with finding those backdoors. Apparently, only one of the three backdoors was ever found by anyone at the NSA.** Even the world's best humans are fallible, and evaluating the maliciousness of code is a very hard problem.

Generally, we think of AI bugs as failing in stupid but dangerous ways, like a Tesla slamming the breaks on a highway tunnel for no apparent reason. But unexpectedly capable outputs can also be a security vulnerability. We're seeing in the [prompting literature](https://twitter.com/xanderai/status/1613974754498576407?s=20) that extremely simple prompt engineering can produce 10-100x improvements in model performance. In [one striking example](https://arxiv.org/abs/2211.09066), an LLM's ability to do math goes from abysmal to extremely good. We can introduce security problems by releasing models where we say "We tested it on X bad behavior and it wasn't very good at it," and then someone finds the magic words that make it very good at X.

Most of these LLM bugs are currently harmless, quaint, funny, and easy to spot. But this will cease to be the case when they have privileged access to server backends or access to my personal information on my phone. As someone who has spent considerable effort securing code that's responsible for billions of dollars, I would be opposed to giving a publicly accessible function with large arbitrary byte inputs access to anything meaningful. Nevertheless, it's inevitable that they will be given access to meaningful assets due to their overwhelming usefulness.

### Securing Software 2.0 with Software 2.0

Shafi Goldwasser introduced the idea of [PAC Verifiability](https://www.youtube.com/watch?v=G6SbRmQApHw), where a model can be verified considerably more efficiently than it can be trained. Additionally, **we are faced with the possibility that a model may know when it is being verified and present the desired answers only to revert to bad behavior when it's no longer being tested**. For a PAC Verifiable system we want such circumvention to be very expensive. The use of [Language Models to Verify Language Models](https://arxiv.org/abs/2202.03286) is one such example of using a model to verify another model in considerably less time than it took to train it. However, we lack strong PAC Verifiability guarantees in our current language model verification methods.

### Software 2.0 Security is a Superset of Software 1.0 Security

It's important to remember that a system is only as secure as its weakest link and that LLMs run on top of Software 1.0. They run on operating systems, hypervisors, virtual machines, and so forth. They are administered by socially engineerable humans. So, in our quest for the security of AI, we cannot forget the security of everything in the entire stack, which includes a lot of Software 1.0 code and a lot of people.

Almost three years ago [Bruce Schneier compared](https://www.schneier.com/blog/archives/2023/02/attacking-machine-learning-systems.html) machine learning security to the security of cryptography. He points out that although finding mathematical weaknesses in cryptographic algorithms is thrilling, the research focus on it has made it so challenging to break cryptography that all of the adversaries focus instead on the weaknesses in the surrounding components: social engineering, bad server configurations, etc. He expects this to happen to ML security as well, becoming so challenging to get a deep learning model to do the wrong thing that we will eventually go back to focusing on the security of the rest of the stack. I think that's wrong. While cryptography is mathematically provable and the implementations are very small and formally verifiable, machine learning systems are enormous black boxes, much like the human brain. Schneier's piece notes that we are still mediocre at designing user interfaces to resist social engineering. I think the difficulty of securing the human mind to attack and erroneous action is a better analogy to the difficulty of securing deep learning systems. It is currently my conviction that **the point at which Software 2.0 becomes one of the most secure components in the stack is much more difficult than achieving the same for cryptography.**

### The Long-Term

My current conviction is that we will see an increase in the number of languages AIs use for communication, including novel languages designed specifically for AI communication. It would be silly for AIs to be constrained to communicate with one another in natural languages that were made for human vocals. Additionally, it would be silly for AIs to be constrained to communicate with one another in programming languages designed for human understanding and readability. Will AIs communicate in machine language? Will they communicate in altogether novel machine languages? As described above, more language understanding means more complexity means more attack surface area.

![Natural language <> Programming Language <> Machine Language](/assets/security-of-software-1-0-vs-2-0/63e06326bb9f18589b4dc047_machine_language_trend-bd58a598.png)

Our current language models are static learners. They undergo a period of pre-training and fine-tuning and then at inference time they don't learn anything. When my prompt passes through the weights of the model, no impression is left. There is no memory, retention, or learning after the initial training. This is bound to change. We will necessarily have models with continuous memory and retrieval, as well as continuous learning. In the long-term, no one will want to interact with an AI that forgets what it told you 5 minutes ago. This is like talking to very drunk people who start repeating themselves like finite state machines stuck in a loop.

### The Very Long-Term (Sci-Fi)

Companies like Neuralink bet on a future where humans must merge with AIs to remain relevant. In such a world where our minds have a programmable interface with the outside world, the vulnerabilities described above now apply to our very consciousness, and exploits could mean manipulation or death. This qualifies as giving a very complex arbitrary byte input function access to something very meaningful.

Ghost in the Shell (1995) explores this, where humans with brain augmentations are hacked with false memories to make them assassinate politicians.

In another example from the science fiction book Accelerando, augmented human intelligences are hacked to forget their best friend or to be unable to see or hear a monkey that's rampaging through the room.

In Ted Chiang's short story "Understand," an augmented intelligence is programmed with a kill switch merely by walking through a grocery store and hearing an adversarial song in passing. When confronted, a single word causes the person's consciousness to unravel completely. This is essentially a depiction of Shafi Goldwasser's [Undetectable Backdoors](https://arxiv.org/abs/2204.06974') finding, but rather than planting the backdoor in a one-time statically trained neural net as we do today, it's planted over time in a continuous learner, an augmented human. One humorous rendition of these backdoors / adversarial samples from a friend of mine: "In a few years these image generators are going to be so good they'll make magic eye illusions and when you look at them cross-eyed you'll smell cinnamon."

We are a long way from these fantastic situations and there is a ton of security research that will be conducted between now and then. It may be that when we arrive at such capabilities these concerns will be completely resolved. For the time being I think this very long-term thought experiment is useful to illustrate the need to "shift left" in Software 2.0 and the high stakes of hooking up these high attack surface area systems to valuable targets.
