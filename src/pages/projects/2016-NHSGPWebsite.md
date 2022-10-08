---
title: NHS GP Website

links:
  live: https://amatiasq.github.io/lulas/
  github: https://github.com/amatiasq/lulas/
  tests: https://coveralls.io/github/amatiasq/lulas

labels:
  - 

pinned: true
iframe: true
---

### Introduction

The GP Website was completed by Shed in 2016, its aim was to enable GPs to easily find information on services in their borough. Prior to this there was no central way for GPs to access information for services and referrals. In 2017 it won best public sector website at the UXUK Awards.

<!-- end extract -->

### Overview and aims
Identify usability problems, prototype new solutions

### Process
To begin my investigation I conducted a stakeholder interview with the main client. We talked through the business goals and began analysing where the site wasn’t meeting its objectives. The client invited a GP that had been regularly using the site to the meeting so I conducted an observation with her to see where she was encountering problems. This session helped me create a roadmap outlining quick wins as well as longer term goals that would take additional research and prototyping.

Improving the Submit a Service Form
Problem: The client directed me to a submit a service form on the site that commissioners were meant to use to upload their information. However the form was seriously lacking. Fields were missing, important information wasn’t required and the structure didn’t match the content users would enter.

“
Is Physioline what I’m meant to refer to? It says speak to the physio… can you refer directly to the hospital?
— GP
“
"That should be clear that Physioline is the self referrals and MSK is the GP referrals"- Client

Solution: It was key to understand the situation service commissioners would be in when filling in this form as it affects how the form saves and validates. Users needed to be able to complete sections in a non-linear order. They also needed to come back to it later if they didn’t have all information to hand or needed help from the wider team. We decided autosave would be best for the user, there also had to be clear validation errors on ‘submit’.

The back-end was also lacking validation so services were being uploaded in a rush, without important information such as who the provider is (who gives the service, e.g. UCLH Hospital) and how to refer (how to inform the service about the patient that requires care). When information was there it was often difficult to understand with conflicting instructions.

Improving the Search: 
Understand
The client had been receiving feedback for GPs about the search. The Google Analytics showed that page views were spread very thinly, the two top pages were the homepage (37%) and Pathways (3%). It was clear that there was a real need to be quickly directed to specific content on the site. In support of this Hotjar heat-mapping revealed that the search is by far the primary action when users land on the homepage.

In the medical world there are a multitude of acronyms and terms for referring to services. These may also change depending on the locality you work in, an example of this is ‘MOSAIC’ in Camden is a service for disabled children, GPs from outside of Camden may not necessarily know to search for this

Where I work it’s not called MSK, our local is called muscular
— GP
“
If you type in muscular you get the wrong things… whereas if you type in MSK there are the right results.
— Client)

Solutiom; Allowing for feedback to enable better tagging. There was a feedback box on the site but it was hidden away in a right hand tab. I realised during testing that most users using Internet Explorer (on average 25% of users) would never see this tab anyway because the right hand scroll covered it. I created a prototype with a new feedback box that sat underneath the search results. This meant the client could receive immediate feedback on whether someone was finding something difficult to find and either investigate the tags or amend them.

Outcome
Since its implementation 11 months ago we’ve had around 500 instances of people using the feedback box. The goal is to ensure this number reduces as content is categorised and tagged more accurately. We also now have lots of rich user data to analyse when making more improvements to the site.

Example result:

What were you looking for? Retinal screening

Page: https://gps.camdenccg.nhs.uk/

Type and reporter: xxxx@nhs.netScope

Search (“opthalm”)

Browser: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36

Screenshot 2018-12-08 at 17.24.48.png
A relatively simple solution has provided the client and her team with a deeper understanding of how people search, allowing her to better cater for their needs and tag content more accurately.



### Outcomes

“I love this form… if it’s possible to love a form!”