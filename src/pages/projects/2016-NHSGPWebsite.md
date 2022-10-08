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

The GP Website was introduced by Camden CCG in 2016. The aim is to enable GPs to easily find information on services in their borough. Prior to this there was no central way for GPs to access information for services and referrals. In 2017 The GP Website won best public sector website at the UXUK Awards.

I was tasked with conducting a UX review of the site to identify improvements. To begin my investigation I conducted a stakeholder interview. We talked through the business goals and began analysed where the site wasn’t meeting its objectives. I then conducted observations with GPs so I could see where they were encountering problems. This session helped me create a roadmap outlining quick wins as well as longer term goals that would take additional research and prototyping.


<!-- end extract -->

### Problem 1: Service Pages had Missing Information
A lot of the service pages had missing information. 

“Is Physioline what I’m meant to refer to? It says speak to the physio… can you refer directly to the hospital?
— GP
“It should be clear that Physioline is the self referrals and MSK is the GP referrals"- Client

The client directed me to a submit a service form on the site that commissioners were meant to use to upload their information. However the form was seriously lacking. Fields were missing, important information wasn’t required and the data wasn't properly structured. 

### Solution
Worked with comissioners to design a new form for submitted services. During the discovery phase I uncovered the following requirements: 
- Comissioners needed to complete the form in a non-linear order because they didn't always have the information needed to hand
- Comissioners needed to be able to save drafts and come back to it to add missing info
- Autosave was expected because other forms on the site behaved this way 

User testing involved many changes to the form labels and hint text, this was hugely important in ensuring commissioners fully understood what info they needed to submit. I also designed clear validation for the form so errors could be resolved quickly and easily.


### Outcome
The form helped Camden CCG collect the correct data improving the accuracy of the content on the site. 

“I love this form… if it’s possible to love a form!” - client

### Problem 2: Inaccurate Search Results
Camden CCG had been receiving negative feedback from GPs about the search. The Google Analytics showed that page views were spread very thinly, the two top pages were the homepage (37%) and Pathways (3%). It was clear that there was a real need to be quickly directed to specific content on the site. In support of this Hotjar heat-mapping revealed that the search is by far the primary action when users land on the homepage.

Where I work it’s not called MSK, our local is called muscular
— GP
“
If you type in muscular you get the wrong things… whereas if you type in MSK there are the right results.
— Client)

### Solution
Allowing for feedback to enable the client to more accurately tag content. There was already feedback box on the site, however it was hidden away in a tab in the corener of the screen. I hypothesised that low enagagement was due to people not noticing it. I created a prototype with a new feedback box that sat underneath the search results. This meant the user would clearly see a feedback box underneath their search if it returned no results.

### Outcomes
A simple solution provided the client and her team with a deeper understanding of how people search, allowing her to better cater for their needs and tag content more accurately. 

Since implementation 11 months ago we’ve had around 500 instances of people using the feedback box. The goal is to ensure this number gets lower as content is categorised and tagged more accurately. We also now have lots of rich user data to analyse when making more improvements to the site.

Example result:

What were you looking for? Retinal screening

Page: https://gps.camdenccg.nhs.uk/

Type and reporter: xxxx@nhs.netScope

Search (“opthalm”)

Browser: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36



