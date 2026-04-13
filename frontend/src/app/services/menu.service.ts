import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  demos = [
    { 
      name: "Encounters UI Sandbox",
      subtitle: "Clinical demo",
      type: "external", 
      url: "https://ihtsdo.github.io/snomed-ui-examples",
      description: "A compact encounter-entry sandbox showing coded capture patterns against FHIR terminology services."
    },
    {
      name: "DDMed Care Lab",
      subtitle: "Clinical demo",
      type: "internal",
      url: "/ehr-lab",
      description: "A full clinical workspace with persistent patients, AI-assisted entry, analytics, interoperability tooling and Smart Health Links, built around reusable FHIR workflows."
    },
    { 
      name: "Allergies",
      subtitle: "Clinical demo",
      type: "internal", 
      url: "/allergies",
      description: "A focused workflow for recording allergies and intolerances using reusable FHIR patterns and terminology bindings."
    },
    { 
      name: "LOINC & SNOMED CT",
      subtitle: "Clinical demo",
      type: "internal", 
      url: "/loinc",
      description: "A LOINC Ontology implementation demo, covering laboratory orders, results and FHIR resources."
    },
    { 
      name: "NCPT Refset",
      subtitle: "Clinical demo",
      type: "internal", 
      url: "/ncpt",
      description: "A clinical demonstration of the NCPT (Nutrition Care Process Terminology) reference set."
    },
    { 
      name: "Adoption Maturity Framework",
      subtitle: "Tool",
      type: "internal", 
      url: "/maturity",
      description: "An assessment workspace for measuring terminology adoption maturity across organizations, programs and products."
    },
    { 
      name: "Terminology Bindings Studio", 
      subtitle: "Learning demo",
      type: "internal", 
      url: "/sandbox",
      description: "A practical environment for learning, testing and reviewing terminology binding strategies."
    },
    { 
      name: "Terminology Maps Explorer",
      subtitle: "Learning demo",
      type: "external", 
      url: "https://ihtsdo.github.io/iid-icd-maps",
      description: "An external explorer for terminology map execution, including rule-based ICD-10 mapping scenarios.", 
    },
    { 
      name: "Post-coordination Explorer",
      subtitle: "Learning demo",
      type: "external", 
      url: "https://ihtsdo.github.io/iid-postcoordination",
      description: "An external explorer for post-coordination workflows backed by a prototype terminology service.",
    },
    { 
      name: "IPS Terminology Explorer",
      subtitle: "Learning demo",
      type: "external", 
      url: "https://ihtsdo.github.io/iid-ips/",
      description: "An external explorer for International Patient Summary terminology assets and reusable reference sets.",
    },
    { 
      name: "FHIR Questionnaire Manager",
      subtitle: "Tool",
      type: "internal", 
      url: "/questionnaires",
      description: "A workspace for managing FHIR questionnaire repositories with terminology-aware bindings.",
    },
    { name: "FHIR Questionnaire Utilities",
      subtitle: "Tool",
      type: "internal", 
      url: "/questionnaires", 
      queryParams: { utility: true },
      description: "Utilities for authoring, reviewing and transforming FHIR questionnaires with coded inputs."
    },
    { 
      name: "Context Representation Transformations",
      subtitle: "Learning demo",
      type: "internal", 
      url: "/context",
      description: "A workspace for exploring how contextual clinical meaning can be transformed into FHIR resources."
    },
    { 
      name: "Clinical Terminology and LLMs",
      subtitle: "Learning demo",
      type: "external", 
      url: "https://ihtsdo.github.io/openai-demo/",
      description: "An external AI-oriented demo showing how clinical terminology can support language model workflows. An OpenAI API key is required."
    },
    { 
      name: "Snoguess (A SNOMED game)",
      subtitle: "Game",
      type: "internal", 
      url: "/snoguess",
      description: "A terminology guessing game for learning coded clinical content while competing for high scores."
    },
    {
      name: "Implementation Roadmap Generator",
      subtitle: "Tool",
      type: "external",
      url: "https://ihtsdo.github.io/roadmap-generator",
      description: "A planning tool for structuring phased terminology adoption roadmaps across organizations and jurisdictions."
    },
    {
      name: "Terminology Change Intelligence",
      subtitle: "Learning demo",
      type: "internal",
      url: "/reports",
      description: "Reports and guidance for understanding release-to-release terminology change and planning downstream updates."
    },
    {
      name: "Descriptive analytics demo",
      subtitle: "Analytics demo",
      type: "internal",
      url: "/descriptive-analytics",
      description: "A descriptive analytics workspace with treemap-based exploration of coded clinical data."
    },
    {
      name: "DDMed Interop Hub",
      subtitle: "Learning demo",
      type: "internal",
      url: "/snomed-integrations",
      description: "A live interop map for exploring relationships between clinical terminology assets, classifications and code systems."
    },
    {
      name: "ValueSet Utility",
      subtitle: "Tool",
      type: "internal",
      url: "/valueset-translator",
      description: "A utility for transforming terminology value sets from spreadsheets and mapping exports into standards-compliant FHIR ValueSet packages."
    },
    {
      name: "Analytics with Snolytical",
      subtitle: "Analytics demo",
      type: "external",
      url: "https://training-snolytical.ihtsdotools.org/",
      description: "An external analytics demonstrator for exploring coded health data directly through clinician-friendly reporting workflows."
    },
    {
      name: "Module Dependency Reference Set Viewer",
      subtitle: "Learning demo",
      type: "internal",
      url: "/mdrs-viewer",
      description: "A graphical viewer for module dependency relationships across terminology releases and extensions."
    },
    {
      name: "Drug Strength Rounding Rules",
      subtitle: "Learning demo",
      type: "internal",
      url: "/drug-strength-rounding",
      description: "A focused module for exploring drug-strength rounding rules and significant-figure calculations."
    },
    {
      name: "Medicinal Product Classes",
      subtitle: "Learning demo",
      type: "internal",
      url: "/medicinal-product-classes",
      description: "A terminology bindings workspace for medicinal product, clinical drug and packaged clinical drug classes."
    }

  ];

  constructor() { }

  getDemos() {
    return this.demos;
  }
}
