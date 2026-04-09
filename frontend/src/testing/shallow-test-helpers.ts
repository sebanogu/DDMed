import { EnvironmentProviders, NO_ERRORS_SCHEMA, Provider } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CodingSpecService } from '../app/services/coding-spec.service';
import { CookieService } from '../app/services/cookie.service';
import { ExcelService } from '../app/services/excel.service';
import { FirebaseService } from '../app/services/firebase.service';
import { GeocodingService } from '../app/services/geocoding.service';
import { GoogleAnalyticsService } from '../app/services/google-analytics.service';
import { MenuService } from '../app/services/menu.service';
import { SnoguessService } from '../app/game/service/snoguess.service';
import { TerminologyService } from '../app/services/terminology.service';

export const shallowTestImports = [
  NoopAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatSidenavModule
];
export const shallowTestSchemas = [NO_ERRORS_SCHEMA];

export function createShallowProviders(): Array<Provider | EnvironmentProviders> {
  return [
    provideRouter([]),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClientTesting(),
    {
      provide: ActivatedRoute,
      useValue: {
        params: of({}),
        queryParams: of({}),
        snapshot: {
          params: {},
          queryParams: {},
          paramMap: convertToParamMap({}),
          queryParamMap: convertToParamMap({})
        }
      }
    },
    {
      provide: Router,
      useValue: {
        navigate: jasmine.createSpy('navigate').and.resolveTo(true),
        events: of()
      }
    },
    {
      provide: MatDialog,
      useValue: {
        open: jasmine.createSpy('open').and.returnValue({
          afterClosed: () => of(null)
        })
      }
    },
    {
      provide: MatDialogRef,
      useValue: {
        close: jasmine.createSpy('close')
      }
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MatSnackBar,
      useValue: {
        openFromComponent: jasmine.createSpy('openFromComponent')
      }
    },
    {
      provide: TerminologyService,
      useValue: {
        expandValueSet: jasmine.createSpy('expandValueSet').and.returnValue(of({ expansion: { contains: [] } })),
        expandValueSetFromServer: jasmine.createSpy('expandValueSetFromServer').and.returnValue(of({ expansion: { contains: [] } })),
        getComputedLanguageContext: jasmine.createSpy('getComputedLanguageContext').and.returnValue('en'),
        getSnowstormFhirBase: jasmine.createSpy('getSnowstormFhirBase').and.returnValue('http://localhost:8082/fhir'),
        getCodeSystems: jasmine.createSpy('getCodeSystems').and.returnValue(of({ entry: [] })),
        getLanguageRefsets: jasmine.createSpy('getLanguageRefsets').and.returnValue(of({ expansion: { contains: [] } })),
        setLanguages: jasmine.createSpy('setLanguages'),
        setEditionsDetails: jasmine.createSpy('setEditionsDetails'),
        setFilteredLanguageMetadata: jasmine.createSpy('setFilteredLanguageMetadata'),
        setContext: jasmine.createSpy('setContext'),
        setSnowstormFhirBase: jasmine.createSpy('setSnowstormFhirBase'),
        setFhirUrlParam: jasmine.createSpy('setFhirUrlParam'),
        setLanguageRefsetConcept: jasmine.createSpy('setLanguageRefsetConcept'),
        setLang: jasmine.createSpy('setLang'),
        getFhirUrlParam: jasmine.createSpy('getFhirUrlParam').and.returnValue('http://snomed.info/sct'),
        lang$: of('en'),
        languageRefsetConcept$: of(null),
        context$: of(null),
        fhirUrlParam$: of('http://snomed.info/sct'),
        snowstormFhirBase$: of('http://localhost:8082/fhir')
      }
    },
    {
      provide: FirebaseService,
      useValue: {
        getScores: jasmine.createSpy('getScores').and.resolveTo([]),
        getMaturityAssessmentResultsByEvent: jasmine.createSpy('getMaturityAssessmentResultsByEvent').and.resolveTo({}),
        getMaturityAssessmentResults: jasmine.createSpy('getMaturityAssessmentResults').and.resolveTo([]),
        subscribeToMaturityAssessmentResults: jasmine.createSpy('subscribeToMaturityAssessmentResults').and.returnValue(() => {}),
        deleteMaturityAssessmentResult: jasmine.createSpy('deleteMaturityAssessmentResult').and.resolveTo(undefined),
        addMaturityAssessmentResult: jasmine.createSpy('addMaturityAssessmentResult').and.resolveTo(undefined)
      }
    },
    {
      provide: GeocodingService,
      useValue: {
        search: jasmine.createSpy('search').and.returnValue(of([]))
      }
    },
    {
      provide: MenuService,
      useValue: {
        getDemos: jasmine.createSpy('getDemos').and.returnValue([])
      }
    },
    {
      provide: GoogleAnalyticsService,
      useValue: {
        trackEvent: jasmine.createSpy('trackEvent')
      }
    },
    {
      provide: CodingSpecService,
      useValue: {
        getCodingSpec: jasmine.createSpy('getCodingSpec').and.returnValue([])
      }
    },
    {
      provide: ExcelService,
      useValue: {}
    },
    {
      provide: CookieService,
      useValue: {
        getCookie: jasmine.createSpy('getCookie').and.returnValue('true'),
        setCookie: jasmine.createSpy('setCookie')
      }
    },
    {
      provide: SnoguessService,
      useValue: {
        getDifficultyLevels: jasmine.createSpy('getDifficultyLevels').and.returnValue([{ name: 'easy' }])
      }
    }
  ];
}
