import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AboutOpentenderPage} from './pages/about/opentender/opentender.component';
import {AuthorityPage} from './pages/authority/authority.component';
import {CompanyPage} from './pages/company/company.component';
import {AboutGlossaryPage} from './pages/about/glossary/glossary.component';
import {AboutFOIPage} from './pages/about/foi/foi.component';
import {AboutHowPage} from './pages/about/how/how.component';
import {AboutPage} from './pages/about/about.component';
import {AboutDataQualityPage} from './pages/about/quality/quality.component';
import {DownloadPage} from './pages/download/download.component';
import {DashboardsAdministrativeCapacityPage} from './pages/dashboards/administrative-capacity/administrative-capacity.component';
import {DashboardsIntegrityPage} from './pages/dashboards/procurement-integrity/procurement-integrity.component';
import {DashboardsPage} from './pages/dashboards/dashboards.component';
import {DashboardsMarketAnalysisPage} from './pages/dashboards/market-analysis/market-analysis.component';
import {DashboardsTransparencyPage} from './pages/dashboards/transparency/transparency.component';
import {HomePage} from './pages/home/home.component';
import {ImprintPage} from './pages/imprint/imprint.component';
import {SearchAuthorityPage} from './pages/search/authority/authority.component';
import {SearchCompanyPage} from './pages/search/company/company.component';
import {SearchPage} from './pages/search/search.component';
import {SearchTenderPage} from './pages/search/tender/tender.component';
import {SectorPage} from './pages/sector/sector.component';
import {StartPage} from './pages/start/start.component';
import {TenderPage} from './pages/tender/tender.component';
import {TestPage} from './pages/test/test.component';
import {RegionPage} from './pages/region/region.component';
import {SharePage} from './pages/share/share.component';

export const routes: Routes = [
	{path: '', component: HomePage},
	{path: 'start', component: StartPage, data: {title: 'Opentender Portals'}},
	{path: 'share', component: SharePage},

	{
		path: 'dashboards',
		component: DashboardsPage,
		data: {title: 'Dashboards'},
		children: [
			{path: '', redirectTo: 'administrative-capacity', pathMatch: 'full'},
			{path: 'market-analysis', component: DashboardsMarketAnalysisPage, data: {title: 'Market Analysis'}},
			{path: 'transparency', component: DashboardsTransparencyPage, data: {title: 'Transparency Indicators'}},
			{path: 'procurement-integrity', component: DashboardsIntegrityPage, data: {title: 'Procurement Integrity Indicators'}},
			{path: 'administrative-capacity', component: DashboardsAdministrativeCapacityPage, data: {title: 'Administrative Capacity Indicators'}}
		]
	},
	{
		path: 'search',
		component: SearchPage,
		data: {title: 'Search'},
		children: [
			{path: '', redirectTo: 'tender', pathMatch: 'full'},
			{path: 'tender', component: SearchTenderPage, data: {title: 'Search Tender'}},
			{path: 'company', component: SearchCompanyPage, data: {title: 'Search Company'}},
			{path: 'authority', component: SearchAuthorityPage, data: {title: 'Search Authority'}}
		]
	},

	{path: 'company/:id', component: CompanyPage, data: {title: 'Company'}},
	{path: 'authority/:id', component: AuthorityPage, data: {title: 'Authority'}},
	{path: 'tender/:id', component: TenderPage, data: {title: 'Tender'}},
	{path: 'sector/:id', component: SectorPage, data: {title: 'Sector'}},
	{path: 'region/:id', component: RegionPage, data: {title: 'Region'}},

	{
		path: 'about',
		component: AboutPage,
		data: {title: 'About'},
		children: [
			{path: '', redirectTo: 'about-opentender', pathMatch: 'full'},
			{path: 'about-opentender', component: AboutOpentenderPage, data: {title: 'About Opentender'}},
			{path: 'how-opentender-works', component: AboutHowPage, data: {title: 'How Opentender works'}},
			{path: 'glossary', component: AboutGlossaryPage, data: {title: 'Glossary'}},
			{path: 'foi', component: AboutFOIPage, data: {title: 'FOI Overview'}},
			{path: 'quality', component: AboutDataQualityPage, data: {title: 'Data Quality'}}
		]
	},
	{path: 'download', component: DownloadPage, data: {title: 'Download'}},
	{path: 'imprint', component: ImprintPage, data: {title: 'Imprint'}},

	{path: 'test', component: TestPage, data: {title: 'Test'}},
	{path: '**', redirectTo: 'start'}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
