import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TerminologyService } from '../services/terminology.service';
import { RefsetViewerComponent } from '../util/refset-viewer/refset-viewer.component';

@Component({
    selector: 'app-ncpt',
    templateUrl: './ncpt.component.html',
    styleUrl: './ncpt.component.css',
    standalone: false
})
export class NcptComponent implements OnInit {

  @ViewChild('refsetViewer') refsetViewerComponent: RefsetViewerComponent | undefined;

  emptySpec: any = {};
  specs = [
    { specFile: "Nutrition Assessment.json", spec: this.emptySpec },
    { specFile: "Nutrition Diagnosis.json", spec: this.emptySpec },
    { specFile: "NCPT_Intervention_form.json", spec: this.emptySpec },
  ];

  constructor(private http: HttpClient, private terminologyService: TerminologyService) { }
  
  ngOnInit() {
    this.terminologyService.fhirUrlParam$.subscribe(urlParam => {
      this.loadSpecs();
    });

    this.terminologyService.snowstormFhirBase$.subscribe(url => {
      this.loadSpecs();
    });

    this.terminologyService.lang$.subscribe(lang => {
      this.loadSpecs();
    });

    this.terminologyService.context$.subscribe(context => {
      this.loadSpecs();
    });
  }

  loadSpecs() {
    this.specs.forEach(async (spec) => {
      spec.spec = this.emptySpec;
      const data: any = await lastValueFrom(this.http.get('assets/specs/ncpt/' + spec.specFile));
      spec.spec = data;
    });

    setTimeout(() => {
      this.updateRefset();
    }, 1000);
  }

  updateRefset() {
    if (this.refsetViewerComponent) {
      this.refsetViewerComponent.cleanAndGetMembers();
    }
  }

  setEnglishContext() {
    this.terminologyService.setLang('en');
  }

  setSwedishContext() {
    this.terminologyService.setContext('sv-X-46011000052107,en-X-900000000000509007');
  }

  setSwedishNursingContext() {
    this.terminologyService.setContext('sv-X-83461000052100,sv-X-46011000052107,en-X-900000000000509007');
  }

  setSwedishPatientContext() {
    this.terminologyService.setContext('sv-X-83461000052100,sv-X-46011000052107,en-X-900000000000509007');
  }

}
