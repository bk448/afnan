import type { TaxForm } from '@/types/content'

/**
 * Form pages are the site's largest organic-traffic surface — people search
 * form numbers, not service names. Every form MUST route onward to at least
 * one service. A form page with no onward link is a dead end.
 *
 * COMPLIANCE: `whenDue` and `penaltyRisk` are qualitative only. No dates,
 * no thresholds, no penalty sums.
 */
export const forms: TaxForm[] = [
  /* ------------------------------------------------ Core Return & Filing */
  {
    slug: '1040',
    formNumber: '1040',
    officialName: 'US Individual Income Tax Return',
    group: 'Core Return & Filing',
    title: 'Form 1040 (Individual Return)',
    seoTitle: 'Form 1040 for US Expats',
    seoDescription:
      'Form 1040 is the annual US individual income tax return, required of citizens and green card holders wherever they live.',
    summary: 'The annual US individual income tax return — required wherever you live.',
    whoFilesIt:
      'US citizens and green card holders whose income exceeds the filing threshold for their status, regardless of country of residence.',
    whatItReports: 'Worldwide income from all sources, with exclusions and credits applied.',
    whenDue: 'Annually, with an automatic extended deadline available to taxpayers abroad.',
    penaltyRisk:
      'Failure to file keeps the assessment period open indefinitely and can forfeit relief that must be claimed on a timely return.',
    overview:
      'Form 1040 is the centre of the US tax system and applies to Americans abroad on exactly the same basis as those at home: worldwide income, reported annually. What differs for expats is everything attached to it — the exclusion or credit used to prevent double taxation, the schedules for foreign accounts and foreign business income, and the extended deadlines available to people living outside the United States.',
    details: [
      {
        heading: 'Filing from abroad',
        body: 'Taxpayers whose tax home is outside the US receive an automatic extension beyond the standard deadline, and a further extension can be requested. Interest on any balance owing generally still runs from the original date.',
      },
      {
        heading: 'Schedules that commonly attach',
        body: 'Foreign account disclosure, self-employment, rental income and the exclusion or credit forms are the ones most often required on an expatriate return.',
      },
    ],
    relatedServices: [
      'expat-tax-returns',
      'state-tax',
      'streamlined-filing',
      'amended-returns',
      'feie-ftc',
      'tax-treaties',
      'totalization',
      'foreign-property',
      'equity-compensation',
      'non-us-spouse',
      'relocation',
      'expatriation',
      'tax-planning',
      'irs-representation',
    ],
    relatedForms: ['2555', '1116', 'schedule-b', '4868', '1040-x'],
    reviewStatus: 'draft',
  },
  {
    slug: 'schedule-b',
    formNumber: 'Schedule B',
    officialName: 'Interest and Ordinary Dividends',
    group: 'Core Return & Filing',
    title: 'Schedule B (Foreign Accounts & Interest)',
    seoTitle: 'Schedule B: Foreign Accounts & Interest',
    seoDescription:
      'Schedule B reports interest and dividends and asks directly whether you hold foreign financial accounts.',
    summary: 'Reports interest and dividends — and asks directly about foreign accounts.',
    whoFilesIt:
      'Taxpayers with interest or dividend income above a modest level, and anyone with a foreign financial account.',
    whatItReports: 'Interest and ordinary dividends, plus a declaration about foreign accounts and foreign trusts.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'The foreign account questions are answered under penalty of perjury. An incorrect answer undermines any later claim that an omission was inadvertent.',
    overview:
      'Schedule B looks routine but carries disproportionate weight for Americans abroad. Part III asks directly whether you have an interest in or signature authority over a foreign financial account, and whether you received a distribution from a foreign trust. Because the return is signed under penalty of perjury, answering these questions incorrectly is a significant problem in its own right — and it is frequently cited where a taxpayer later argues that a failure to report was not wilful.',
    details: [
      {
        heading: 'Why Part III matters',
        body: 'It is the point at which the return formally asks about foreign accounts. A wrong answer here is considerably more serious than the omission of the account itself.',
      },
    ],
    relatedServices: ['expat-tax-returns', 'fbar'],
    relatedForms: ['fbar', '8938', '1040'],
    reviewStatus: 'draft',
  },
  {
    slug: 'schedule-c-se',
    formNumber: 'Schedule C / SE',
    officialName: 'Profit or Loss From Business; Self-Employment Tax',
    group: 'Core Return & Filing',
    title: 'Schedule C & SE (Self-Employment)',
    seoTitle: 'Schedule C & SE for Self-Employed Expats',
    seoDescription:
      'Schedule C reports self-employment profit and Schedule SE computes self-employment tax, which the foreign earned income exclusion does not remove.',
    summary: 'Self-employment profit, and the tax on it that the exclusion does not remove.',
    whoFilesIt: 'Self-employed Americans, including freelancers and sole traders operating abroad.',
    whatItReports: 'Business income and expenses, and the resulting self-employment tax.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Self-employment tax is commonly overlooked by expats who excluded their income, producing an unexpected balance with interest attached.',
    overview:
      'Self-employed Americans abroad regularly discover that excluding all of their income still leaves them with a US liability. The foreign earned income exclusion applies to income tax; self-employment tax is computed separately on Schedule SE and is unaffected by it. Where a totalization agreement exists between the US and your country of residence, it may assign your social security coverage to one country only and remove the US charge — but that relief depends on the agreement and is evidenced by a certificate of coverage.',
    details: [
      {
        heading: 'The exclusion does not help here',
        body: 'Schedule SE is computed on net self-employment earnings before the exclusion is considered, which is why the liability survives.',
      },
    ],
    relatedServices: ['totalization'],
    relatedForms: ['1040', '1040-es'],
    reviewStatus: 'draft',
  },
  {
    slug: 'schedule-e',
    formNumber: 'Schedule E',
    officialName: 'Supplemental Income and Loss',
    group: 'Core Return & Filing',
    title: 'Schedule E (Rental Income)',
    seoTitle: 'Schedule E: Foreign Rental Income',
    seoDescription:
      'Schedule E reports rental income including property held abroad, under US depreciation rules.',
    summary: 'Rental income and loss, including property held outside the United States.',
    whoFilesIt: 'Anyone receiving rental income, wherever the property is located.',
    whatItReports: 'Rental income, allowable expenses and depreciation.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Depreciation is recaptured on sale whether or not it was claimed, so omitting it does not avoid it.',
    overview:
      'Rental income from property abroad is reported on Schedule E under US rules rather than those of the country where the property sits. Depreciation is mandatory and uses a recovery period for foreign property that commonly differs from local treatment. Because unclaimed depreciation is still recaptured when the property is sold, omitting it produces the worst of both outcomes.',
    details: [
      {
        heading: 'Foreign property depreciation',
        body: 'US rules set the recovery period, not local rules, and the period applied to foreign property differs from the domestic one.',
      },
    ],
    relatedServices: ['foreign-property'],
    relatedForms: ['1040', '1116'],
    reviewStatus: 'draft',
  },
  {
    slug: '1040-x',
    formNumber: '1040-X',
    officialName: 'Amended US Individual Income Tax Return',
    group: 'Core Return & Filing',
    title: 'Form 1040-X (Amended Return)',
    seoTitle: 'Form 1040-X: Amending an Expat Tax Return',
    seoDescription:
      'Form 1040-X corrects a previously filed US return — used where relief was claimed incorrectly or income was misreported.',
    summary: 'Corrects a return you have already filed.',
    whoFilesIt: 'Taxpayers correcting an error in a return already submitted.',
    whatItReports: 'The changes to the original return and the reason for them.',
    whenDue: 'Subject to time limits where the amendment produces a refund.',
    penaltyRisk:
      'Amending is not always the right route. Where income or accounts were omitted entirely, a formal catch-up procedure may be more appropriate.',
    overview:
      'Returns prepared without expatriate expertise fail in predictable ways: the wrong relief claimed, foreign tax credits miscalculated or not carried forward, or foreign pensions treated as domestic ones. Form 1040-X corrects these. It is not, however, the right tool for every problem — where accounts or income were left out altogether, an amendment can sit awkwardly alongside the formal procedures designed for that situation.',
    details: [
      {
        heading: 'Refund time limits',
        body: 'A claim for refund from an earlier year is subject to a time limit, so corrections that would produce money back are worth assessing promptly.',
      },
    ],
    relatedServices: ['amended-returns', 'irs-representation'],
    relatedForms: ['1040', '1116', '2555'],
    reviewStatus: 'draft',
  },
  {
    slug: '1040-nr',
    formNumber: '1040-NR',
    officialName: 'US Nonresident Alien Income Tax Return',
    group: 'Core Return & Filing',
    title: 'Form 1040-NR (Dual-Status Statement)',
    seoTitle: 'Form 1040-NR & Dual-Status Returns',
    seoDescription:
      'Form 1040-NR reports US-source income for non-residents and forms part of a dual-status filing in the year of a move.',
    summary: 'The non-resident return — and part of a dual-status filing in the year you move.',
    whoFilesIt:
      'Non-residents with US-source income, and taxpayers filing dual-status in the year residency began or ended.',
    whatItReports: 'US-source income for the period of non-residence.',
    whenDue: 'Annually, with the deadline depending on the type of income.',
    penaltyRisk:
      'A dual-status year restricts certain filing statuses and deductions that are available in an ordinary year.',
    overview:
      'In the year you arrive in or leave the US tax system, you can be a resident for part of it and a non-resident for the rest. That produces a dual-status filing, in which Form 1040-NR covers the non-resident period. Residency start and end dates are set by statutory tests rather than by the date of the move itself, which is why the timing of income around a relocation has a direct effect on the result.',
    details: [
      {
        heading: 'Dual-status restrictions',
        body: 'Several filing statuses and deductions available in a normal year cannot be used in a dual-status one, which can make the timing of a move materially important.',
      },
    ],
    relatedServices: ['state-tax', 'relocation', 'expatriation'],
    relatedForms: ['1040', '8854'],
    reviewStatus: 'draft',
  },
  {
    slug: '1040-es',
    formNumber: '1040-ES',
    officialName: 'Estimated Tax for Individuals',
    group: 'Core Return & Filing',
    title: 'Form 1040-ES (Estimated Tax)',
    seoTitle: 'Form 1040-ES: Estimated Tax for Expats',
    seoDescription:
      'Form 1040-ES is used to pay US tax in instalments where no employer withholds — common for expats and the self-employed.',
    summary: 'Paying US tax in instalments where nobody is withholding it for you.',
    whoFilesIt:
      'Taxpayers expecting a balance owing with no US withholding — typically the self-employed and those paid by a foreign employer.',
    whatItReports: 'Estimated tax payments made during the year.',
    whenDue: 'In instalments across the year.',
    penaltyRisk: 'Underpayment of estimated tax carries its own charge, separate from late-payment interest.',
    overview:
      'Americans employed by a foreign company have no US employer withholding tax on their behalf, and the self-employed have none either. Where a balance is expected, it is paid during the year through estimated payments rather than in one amount at filing. Missing these produces an underpayment charge even where the return itself is filed on time and the balance is settled in full.',
    details: [
      {
        heading: 'Who it catches',
        body: 'Most commonly the self-employed abroad and employees of foreign companies, who often assume payment is due only at filing.',
      },
    ],
    relatedServices: ['expat-tax-returns'],
    relatedForms: ['1040', 'schedule-c-se'],
    reviewStatus: 'draft',
  },
  {
    slug: '4868',
    formNumber: '4868',
    officialName: 'Application for Automatic Extension of Time to File',
    group: 'Core Return & Filing',
    title: 'Form 4868 (Extension)',
    seoTitle: 'Form 4868: Filing Extension for Expats',
    seoDescription:
      'Form 4868 extends the deadline to file a US return. Expats also receive an automatic extension without filing it.',
    summary: 'Extends the deadline to file — but not the deadline to pay.',
    whoFilesIt: 'Taxpayers needing more time to file beyond the deadline available to them.',
    whatItReports: 'A request for additional filing time, with an estimate of any tax due.',
    whenDue: 'By the filing deadline that applies to you.',
    penaltyRisk:
      'An extension of time to file is not an extension of time to pay. Interest runs on any balance from the original date.',
    overview:
      'Taxpayers whose tax home is outside the United States already receive an automatic extension beyond the standard deadline without filing anything. Form 4868 extends matters further where more time is still needed. In both cases the extension covers filing only — interest on an unpaid balance accrues from the original due date regardless.',
    details: [
      {
        heading: 'The automatic expat extension',
        body: 'Available by virtue of being abroad, with no form required. Form 4868 is used where an additional period is needed on top of it.',
      },
    ],
    relatedServices: ['expat-tax-returns'],
    relatedForms: ['1040', '2350'],
    reviewStatus: 'draft',
  },
  {
    slug: '2350',
    formNumber: '2350',
    officialName: 'Application for Extension of Time to File US Income Tax Return',
    group: 'Core Return & Filing',
    title: 'Form 2350 (Extension to Qualify for FEIE)',
    seoTitle: 'Form 2350: Extension to Qualify for the FEIE',
    seoDescription:
      'Form 2350 gives extra time to file where you need to meet a residence or presence test before claiming the foreign earned income exclusion.',
    summary: 'Extra time specifically for people who need to meet a test before claiming the exclusion.',
    whoFilesIt:
      'Taxpayers who expect to qualify for the foreign earned income exclusion but have not yet satisfied the relevant test.',
    whatItReports: 'A request for time to allow a qualifying period to complete.',
    whenDue: 'By the filing deadline that applies to you.',
    penaltyRisk:
      'Filing without the extension and before qualifying can mean losing the exclusion for that year, or requiring an amendment later.',
    overview:
      'The foreign earned income exclusion requires meeting either a physical presence test or a bona fide residence test. Someone who moved abroad partway through a year may not have satisfied either by the filing deadline. Form 2350 exists for exactly that situation, giving enough time for the qualifying period to complete so the exclusion can be claimed on an original return rather than chased through an amendment.',
    details: [
      {
        heading: 'How it differs from Form 4868',
        body: 'Form 4868 is a general extension. Form 2350 is specific to waiting out a qualifying period for the exclusion, and the period granted reflects that purpose.',
      },
    ],
    relatedServices: ['feie-ftc', 'relocation'],
    relatedForms: ['2555', '4868'],
    reviewStatus: 'draft',
  },

  /* --------------------------------------------- Foreign Income & Credits */
  {
    slug: '2555',
    formNumber: '2555',
    officialName: 'Foreign Earned Income',
    group: 'Foreign Income & Credits',
    title: 'Form 2555 (FEIE)',
    seoTitle: 'Form 2555: Foreign Earned Income Exclusion',
    seoDescription:
      'Form 2555 claims the foreign earned income exclusion, removing a capped amount of foreign salary or self-employment income from US tax.',
    summary: 'Claims the foreign earned income exclusion on salary and self-employment income earned abroad.',
    whoFilesIt:
      'Taxpayers with foreign earned income who meet either the bona fide residence or physical presence test.',
    whatItReports: 'Foreign earned income and the qualifying test relied on.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Revoking the exclusion once claimed prevents claiming it again for a number of years without permission, so the choice has a long horizon.',
    overview:
      'Form 2555 removes a capped amount of foreign earned income from US taxation. It applies only to earned income — salary and self-employment profit — and never to investment income, pensions or capital gains. It also does not remove self-employment tax, which is why self-employed claimants frequently still owe. Crucially, the exclusion is not automatically the better option: in higher-tax countries the foreign tax credit often produces a better result and preserves credits that carry forward.',
    details: [
      {
        heading: 'The two qualifying tests',
        body: 'Bona fide residence looks at the nature and intention of your presence abroad; physical presence counts days over a twelve-month window. Only one needs to be met.',
      },
      {
        heading: 'What it does not cover',
        body: 'Investment income, pension income and capital gains are outside the exclusion entirely, and self-employment tax is unaffected by it.',
      },
    ],
    relatedServices: ['expat-tax-returns', 'amended-returns', 'feie-ftc', 'relocation'],
    relatedForms: ['1116', '2350', '1040'],
    reviewStatus: 'draft',
  },
  {
    slug: '1116',
    formNumber: '1116',
    officialName: 'Foreign Tax Credit',
    group: 'Foreign Income & Credits',
    title: 'Form 1116 (Foreign Tax Credit)',
    seoTitle: 'Form 1116: Foreign Tax Credit for Expats',
    seoDescription:
      'Form 1116 claims a credit for foreign tax paid against your US liability, with unused credit carrying forward.',
    summary: 'Credits foreign tax you have already paid against your US liability.',
    whoFilesIt: 'Taxpayers who paid or accrued income tax to a foreign country.',
    whatItReports: 'Foreign income by category and the foreign tax paid on it.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Credits are computed by category and limited accordingly. Errors here commonly waste credit that could have carried forward for years.',
    overview:
      'The foreign tax credit offsets US tax by tax already paid to another country on the same income. Unlike the exclusion it applies to all categories of income, not just earned income, and unused credit can generally be carried forward. In a higher-tax country it frequently eliminates the US liability entirely while building a carryforward balance. The computation is done separately for different categories of income, and getting that allocation wrong is one of the most common errors on expatriate returns.',
    details: [
      {
        heading: 'Categories and limitation',
        body: 'Credit is computed separately for different income categories and limited to the US tax attributable to each. Credit in one category cannot be used against another.',
      },
      {
        heading: 'Carryforward',
        body: 'Unused credit can generally be carried forward, which makes accurate computation valuable even in a year when no US tax is owed.',
      },
    ],
    relatedServices: [
      'expat-tax-returns',
      'amended-returns',
      'feie-ftc',
      'tax-treaties',
      'foreign-property',
      'equity-compensation',
      'gilti',
      'tax-planning',
    ],
    relatedForms: ['2555', '1040', '8833'],
    reviewStatus: 'draft',
  },
  {
    slug: '8833',
    formNumber: '8833',
    officialName: 'Treaty-Based Return Position Disclosure',
    group: 'Foreign Income & Credits',
    title: 'Form 8833 (Treaty Position)',
    seoTitle: 'Form 8833: Treaty-Based Return Position',
    seoDescription:
      'Form 8833 discloses a treaty-based position taken on a US return. Failing to disclose carries its own penalty.',
    summary: 'Discloses a position you are taking under a tax treaty.',
    whoFilesIt: 'Taxpayers relying on a treaty provision that requires formal disclosure.',
    whatItReports: 'The treaty and article relied on, and the position taken.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Failing to disclose a position that requires disclosure is penalised separately, even where the position itself is correct.',
    overview:
      'Where a treaty provision changes the result that US law would otherwise produce, that position may have to be disclosed on Form 8833. For US citizens the practical scope is narrowed by the saving clause, which preserves the US right to tax its own citizens as though the treaty did not exist — subject to listed exceptions. Those exceptions, typically covering pensions and certain other categories, are where most genuine treaty benefit for an American abroad is found.',
    details: [
      {
        heading: 'The saving clause',
        body: 'Most US treaties reserve taxing rights over US citizens with specific carve-outs. Identifying whether your position falls within a carve-out is the substance of the analysis.',
      },
    ],
    relatedServices: ['tax-treaties', 'totalization', 'foreign-pensions'],
    relatedForms: ['1116', '1040'],
    reviewStatus: 'draft',
  },
  {
    slug: 'schedule-8812',
    formNumber: 'Schedule 8812',
    officialName: 'Credits for Qualifying Children and Other Dependents',
    group: 'Foreign Income & Credits',
    title: 'Schedule 8812 (Child Tax Credit)',
    seoTitle: 'Schedule 8812: Child Tax Credit for Expats',
    seoDescription:
      'Schedule 8812 claims the child tax credit, which interacts awkwardly with the foreign earned income exclusion.',
    summary: 'Claims credits for children — and interacts awkwardly with the exclusion.',
    whoFilesIt: 'Taxpayers claiming a credit for a qualifying child or dependent.',
    whatItReports: 'Qualifying children and the credit claimed.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Children must meet identification requirements to qualify. Claims that do not meet them can be disallowed and may restrict future claims.',
    overview:
      'Families abroad can often claim credits for their children, but the interaction with the foreign earned income exclusion is unhelpful: excluding your income can reduce or remove access to the refundable portion of the credit, because there is no longer income against which it is computed. This is one of the clearest situations in which claiming the foreign tax credit instead of the exclusion produces a better overall result for a household.',
    details: [
      {
        heading: 'Why the exclusion can cost you the credit',
        body: 'Excluding earned income removes the base the refundable portion is calculated against, so a household can lose more in credit than it saves in tax.',
      },
    ],
    relatedServices: ['non-us-spouse'],
    relatedForms: ['1040', '2555'],
    reviewStatus: 'draft',
  },
  {
    slug: '8960',
    formNumber: '8960',
    officialName: 'Net Investment Income Tax',
    group: 'Foreign Income & Credits',
    title: 'Form 8960 (Net Investment Income Tax)',
    seoTitle: 'Form 8960: Net Investment Income Tax for Expats',
    seoDescription:
      'Form 8960 computes the net investment income tax, which foreign tax credits generally cannot offset.',
    summary: 'An additional tax on investment income that foreign tax credits generally cannot offset.',
    whoFilesIt:
      'Taxpayers with investment income whose modified adjusted gross income exceeds the applicable threshold.',
    whatItReports: 'Net investment income and the additional tax on it.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Because foreign tax credits generally cannot be applied against it, this charge can survive even where all regular US tax has been eliminated.',
    overview:
      'The net investment income tax is an additional charge on investment income above a threshold. Its significance for Americans abroad is that the ordinary foreign tax credit generally cannot be used against it. A taxpayer in a high-tax country whose foreign tax credits have eliminated all regular US income tax can therefore still face this charge on investment income — a result that surprises people who assumed credits had resolved their US position entirely.',
    details: [
      {
        heading: 'Why credits do not help',
        body: 'The charge sits outside the regular income tax against which the foreign tax credit is applied, so it can remain payable after credits have removed everything else.',
      },
    ],
    relatedServices: ['expat-tax-returns'],
    relatedForms: ['1040', '1116'],
    reviewStatus: 'draft',
  },
  {
    slug: '8606',
    formNumber: '8606',
    officialName: 'Nondeductible IRAs',
    group: 'Foreign Income & Credits',
    title: 'Form 8606 (IRA / Roth Basis)',
    seoTitle: 'Form 8606: IRA and Roth Basis for Expats',
    seoDescription:
      'Form 8606 tracks basis in IRAs and Roth conversions — important for expats whose contributions may be restricted.',
    summary: 'Tracks your basis in IRAs and Roth accounts so it is not taxed twice.',
    whoFilesIt:
      'Taxpayers making non-deductible IRA contributions, converting to a Roth, or taking distributions from an account with basis.',
    whatItReports: 'Non-deductible contributions, conversions and distributions.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Untracked basis is effectively taxed twice, and the records needed to reconstruct it are often unavailable years later.',
    overview:
      'Form 8606 records the portion of a retirement account that has already been taxed, so it is not taxed again on withdrawal. For Americans abroad there is a trap ahead of it: claiming the foreign earned income exclusion can remove the compensation needed to support an IRA contribution at all, producing an excess contribution that carries its own annual charge until corrected. Planning the two together avoids a problem that is awkward and expensive to unwind.',
    details: [
      {
        heading: 'The exclusion can block contributions',
        body: 'Excluding all earned income can leave no qualifying compensation to support a contribution, making one already paid an excess contribution.',
      },
    ],
    relatedServices: ['expat-tax-returns'],
    relatedForms: ['1040', '2555'],
    reviewStatus: 'draft',
  },

  /* ------------------------------------------- Foreign Accounts & Assets */
  {
    slug: 'fbar',
    formNumber: 'FinCEN 114',
    officialName: 'Report of Foreign Bank and Financial Accounts',
    group: 'Foreign Accounts & Assets',
    title: 'FinCEN 114 (FBAR)',
    seoTitle: 'FBAR / FinCEN 114 for US Expats',
    seoDescription:
      'The FBAR reports foreign bank and financial accounts to FinCEN. It is separate from your tax return and from Form 8938.',
    summary: 'Reports your foreign financial accounts to FinCEN — separately from your tax return.',
    whoFilesIt:
      'US persons whose combined foreign account balances exceed the threshold at any point in the year, including those with signature authority only.',
    whatItReports: 'Each foreign financial account and its maximum balance during the year.',
    whenDue: 'Annually, with an automatic extension applied.',
    penaltyRisk:
      'Penalties are assessed per account and per year, and the wilful tier is dramatically more severe than the non-wilful one.',
    overview:
      'The FBAR is filed with FinCEN rather than the IRS and is driven by account balances, not income — which is why people who owe no tax are still required to file it. The threshold tests the combined highest balance across all your foreign accounts at any moment during the year, so transferring money between accounts can cause the same funds to be counted more than once. The definition of a reportable account is far broader than most people expect, extending to pensions in some forms, certain insurance products, and accounts you merely have authority over.',
    details: [
      {
        heading: 'Commonly missed accounts',
        body: 'Joint accounts with a non-US spouse, dormant accounts, employer pension arrangements, and business accounts you can sign on but do not own.',
      },
      {
        heading: 'Aggregate, not per account',
        body: 'The test is the combined maximum across all accounts, so several small accounts can trigger it even where none would individually.',
      },
      {
        heading: 'Catching up',
        body: 'Missed FBARs should be addressed through the appropriate procedure rather than filed quietly, as the choice affects the penalty position.',
      },
    ],
    relatedServices: [
      'fbar',
      'fatca',
      'streamlined-filing',
      'delinquent-submissions',
      'foreign-pensions',
      'pfic',
      'non-us-spouse',
      'irs-representation',
    ],
    relatedForms: ['8938', 'schedule-b', '8621'],
    reviewStatus: 'draft',
  },
  {
    slug: '8938',
    formNumber: '8938',
    officialName: 'Statement of Specified Foreign Financial Assets',
    group: 'Foreign Accounts & Assets',
    title: 'Form 8938 (FATCA)',
    seoTitle: 'Form 8938: FATCA Reporting for Expats',
    seoDescription:
      'Form 8938 reports specified foreign financial assets with your US return. It does not replace the FBAR.',
    summary: 'Reports specified foreign financial assets with your return — and does not replace the FBAR.',
    whoFilesIt:
      'Taxpayers whose specified foreign financial assets exceed thresholds that vary by filing status and whether they live abroad.',
    whatItReports: 'Foreign accounts and a broader class of foreign financial assets.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Failure to file carries its own penalty and can hold the assessment period open on the entire return, not just the unreported asset.',
    overview:
      'Form 8938 is the taxpayer side of FATCA, filed with your return while foreign financial institutions report the same accounts independently. Its asset definition is broader than the FBAR, reaching interests that are not accounts at all, and its thresholds are higher and vary with filing status and residence. Most significantly, failing to file it can keep the assessment period open on your whole return — one of the more consequential provisions attached to an information form.',
    details: [
      {
        heading: 'Broader than the FBAR',
        body: 'Covers foreign assets beyond deposit and custodial accounts, including certain interests in foreign entities and some contractual arrangements.',
      },
      {
        heading: 'Why bank letters arrive',
        body: 'Institutions report US account holders under FATCA. A letter asking you to confirm status is routine, but it does mean parallel reporting is happening.',
      },
    ],
    relatedServices: [
      'fbar',
      'fatca',
      'streamlined-filing',
      'delinquent-submissions',
      'foreign-pensions',
      'pfic',
      'equity-compensation',
      'non-us-spouse',
      'foreign-trusts-gifts',
    ],
    relatedForms: ['fbar', '8621', '3520'],
    reviewStatus: 'draft',
  },
  {
    slug: '8621',
    formNumber: '8621',
    officialName: 'Information Return by a Shareholder of a PFIC',
    group: 'Foreign Accounts & Assets',
    title: 'Form 8621 (PFIC)',
    seoTitle: 'Form 8621: PFIC Reporting for Expats',
    seoDescription:
      'Form 8621 reports holdings in passive foreign investment companies — which includes most non-US mutual funds and ETFs.',
    summary: 'Reports each holding in a foreign investment fund — one form per fund, per year.',
    whoFilesIt: 'US persons holding shares in a passive foreign investment company.',
    whatItReports: 'Income, distributions, gains and any elections for each PFIC held.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'The default regime taxes gains at the highest ordinary rates with an interest charge, and an unfiled form can hold the return open.',
    overview:
      'A PFIC is, in practice, almost any pooled investment fund established outside the United States — a European UCITS fund, a UK investment trust, an Australian managed fund, or funds held inside an ISA or insurance wrapper. Under the default regime, gains and certain distributions are taxed at the highest ordinary rates with an interest charge applied as if tax had been deferred, which can produce an effective rate far above that on an equivalent US fund. Elections can change this, but they generally have to be made in time and one depends on information many foreign funds simply do not publish.',
    details: [
      {
        heading: 'One form per fund',
        body: 'Reporting is generally required for each PFIC held, so a diversified portfolio of foreign funds produces a stack of forms and a substantial share of the compliance cost.',
      },
      {
        heading: 'The elections',
        body: 'Available elections replace the default treatment with annual taxation of income or of unrealised gains. Each has conditions and each is generally better made early.',
      },
    ],
    relatedServices: ['fatca', 'foreign-pensions', 'pfic', 'tax-planning'],
    relatedForms: ['8938', 'fbar'],
    reviewStatus: 'draft',
  },

  /* ----------------------------------------------------- Foreign Entities */
  {
    slug: '5471',
    formNumber: '5471',
    officialName: 'Information Return With Respect to Certain Foreign Corporations',
    group: 'Foreign Entities',
    title: 'Form 5471 (Foreign Corporation)',
    seoTitle: 'Form 5471: Foreign Corporation Reporting',
    seoDescription:
      'Form 5471 reports ownership in a foreign corporation. Penalties for late filing are automatic and substantial.',
    summary: 'Reports your ownership of a foreign corporation — due whether or not it made money.',
    whoFilesIt:
      'US persons who are officers, directors or shareholders of a foreign corporation at the levels the rules specify.',
    whatItReports: 'Ownership, financial statements, earnings and transactions with the corporation.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'A substantial automatic penalty applies per form and per year for late filing, with further amounts if it remains unfiled after notice.',
    overview:
      'Form 5471 is among the most demanding information returns in the US system, requiring the foreign company’s financial statements restated to US standards alongside ownership and transaction detail. It is an information return, so it is due regardless of whether the company was profitable or distributed anything. The penalty attaches to the late filing itself rather than to any underpayment, which is how a dormant company with no income produces a significant assessment.',
    details: [
      {
        heading: 'Filing categories',
        body: 'Different categories of filer face different schedules and disclosure levels depending on their relationship to the corporation and their level of ownership.',
      },
      {
        heading: 'Dormant companies still report',
        body: 'The obligation follows ownership and control rather than profitability, so loss-making and inactive entities remain reportable.',
      },
    ],
    relatedServices: ['delinquent-submissions', 'foreign-entities', 'gilti'],
    relatedForms: ['8992', '8858', '926'],
    reviewStatus: 'draft',
  },
  {
    slug: '8865',
    formNumber: '8865',
    officialName: 'Return of US Persons With Respect to Certain Foreign Partnerships',
    group: 'Foreign Entities',
    title: 'Form 8865 (Foreign Partnership)',
    seoTitle: 'Form 8865: Foreign Partnership Reporting',
    seoDescription:
      'Form 8865 reports interests in foreign partnerships, with penalties mirroring those for foreign corporations.',
    summary: 'The partnership equivalent of Form 5471.',
    whoFilesIt: 'US persons with a controlling or substantial interest in a foreign partnership.',
    whatItReports: 'Partnership income, ownership, contributions and transfers.',
    whenDue: 'With your federal return.',
    penaltyRisk: 'Automatic penalties mirror those for foreign corporation reporting.',
    overview:
      'Form 8865 applies the same reporting philosophy as Form 5471 to foreign partnerships. The complication is classification: an entity treated as a partnership locally may be treated as a corporation for US purposes or the reverse, and in some cases the treatment can be elected. Establishing the correct US classification comes before deciding which form is required.',
    details: [
      {
        heading: 'Classification first',
        body: 'US entity classification does not follow local labels, and an election may be available that changes which return is due.',
      },
    ],
    relatedServices: ['delinquent-submissions', 'foreign-entities'],
    relatedForms: ['5471', '8858'],
    reviewStatus: 'draft',
  },
  {
    slug: '8858',
    formNumber: '8858',
    officialName: 'Information Return of US Persons With Respect to Foreign Disregarded Entities',
    group: 'Foreign Entities',
    title: 'Form 8858 (Foreign Disregarded Entity)',
    seoTitle: 'Form 8858: Foreign Disregarded Entity Reporting',
    seoDescription:
      'Form 8858 reports foreign disregarded entities and foreign branches — frequently missed by single-member business owners.',
    summary: 'Reports a foreign entity disregarded for US purposes, including a foreign branch.',
    whoFilesIt:
      'US persons owning a foreign disregarded entity, and those operating a foreign branch.',
    whatItReports: 'The entity’s income, balance sheet and currency information.',
    whenDue: 'With your federal return.',
    penaltyRisk: 'Carries its own automatic penalty for late filing.',
    overview:
      'A single-member company abroad is commonly disregarded for US purposes, meaning its income flows directly onto your personal return. People reasonably conclude that if the entity is ignored, nothing separate needs filing — but Form 8858 is still required, and the branch rules extend the obligation further than most expect. This is one of the most frequently missed forms among self-employed Americans operating through a local company.',
    details: [
      {
        heading: 'Disregarded does not mean unreported',
        body: 'The entity being ignored for income purposes does not remove the separate information reporting obligation attached to owning it.',
      },
    ],
    relatedServices: ['foreign-entities'],
    relatedForms: ['5471', '8865'],
    reviewStatus: 'draft',
  },
  {
    slug: '8992',
    formNumber: '8992',
    officialName: 'US Shareholder Calculation of Global Intangible Low-Taxed Income',
    group: 'Foreign Entities',
    title: 'Form 8992 (GILTI)',
    seoTitle: 'Form 8992: GILTI Calculation',
    seoDescription:
      'Form 8992 computes GILTI, which can tax your foreign company’s profits before any distribution is made.',
    summary: 'Computes GILTI — tax on company profits you have not taken out.',
    whoFilesIt: 'US shareholders of controlled foreign corporations with GILTI inclusions.',
    whatItReports: 'The GILTI inclusion attributable to you.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'Individual shareholders do not automatically receive the reliefs available to corporate ones, so the untreated result can be materially worse.',
    overview:
      'GILTI was aimed at large multinationals but is drafted broadly enough to catch individual Americans running ordinary businesses abroad. Where it applies, profits earned inside your foreign company are taxed to you personally in the year earned, regardless of whether anything was distributed. Elections exist that change how the income is taxed in your hands, and which is appropriate depends on your rates, your country of residence and your plans for the business.',
    details: [
      {
        heading: 'Why individuals fare worse',
        body: 'Several reliefs that soften the impact for corporate shareholders are not automatically available to individuals, which is why elections and structuring usually form part of the response.',
      },
    ],
    relatedServices: ['foreign-entities', 'gilti'],
    relatedForms: ['5471', '1116'],
    reviewStatus: 'draft',
  },
  {
    slug: '926',
    formNumber: '926',
    officialName: 'Return by a US Transferor of Property to a Foreign Corporation',
    group: 'Foreign Entities',
    title: 'Form 926 (Transfer to Foreign Corporation)',
    seoTitle: 'Form 926: Transfers to a Foreign Corporation',
    seoDescription:
      'Form 926 reports transfers of property, including cash above a threshold, to a foreign corporation.',
    summary: 'Reports property — including cash — transferred to a foreign corporation.',
    whoFilesIt: 'US persons transferring property to a foreign corporation above the reporting level.',
    whatItReports: 'The property transferred and the consideration received.',
    whenDue: 'With your federal return.',
    penaltyRisk:
      'The penalty is calculated by reference to the value transferred, which makes it substantial on large capitalisations.',
    overview:
      'Form 926 catches people who do not think of themselves as transferring property at all. Capitalising your own foreign company with cash is a transfer of property for this purpose, so funding a new business abroad above the reporting level triggers it. Because the penalty is value-based rather than fixed, the exposure scales with the amount funded.',
    details: [
      {
        heading: 'Cash counts',
        body: 'Funding a foreign company you own is a reportable transfer once it passes the reporting level, even though nothing was sold or exchanged.',
      },
    ],
    relatedServices: ['foreign-entities'],
    relatedForms: ['5471'],
    reviewStatus: 'draft',
  },

  /* ---------------------------------------------- Trusts, Gifts & Estates */
  {
    slug: '3520',
    formNumber: '3520',
    officialName: 'Annual Return To Report Transactions With Foreign Trusts and Receipt of Certain Foreign Gifts',
    group: 'Trusts, Gifts & Estates',
    title: 'Form 3520 (Foreign Trusts & Gifts)',
    seoTitle: 'Form 3520: Foreign Trusts, Gifts & Inheritances',
    seoDescription:
      'Form 3520 reports foreign trust transactions and large gifts or inheritances received from abroad.',
    summary: 'Reports foreign trust dealings and large gifts or inheritances from abroad.',
    whoFilesIt:
      'US persons with foreign trust transactions, and those receiving foreign gifts or bequests above the reporting level.',
    whatItReports: 'Trust transactions, distributions, and gifts or inheritances received.',
    whenDue: 'Generally with your federal return.',
    penaltyRisk:
      'The penalty is calculated against the amount involved, so it can be severe even though receiving an inheritance is not itself taxable.',
    overview:
      'Receiving an inheritance or a substantial gift from abroad is generally not taxable to the recipient — but it is reportable, and the penalty for failing to report is a proportion of the amount received. This is the form people encounter after a relative dies overseas, usually without any idea it existed. It also covers foreign trusts, and US classification does not follow local labels: certain pension, savings and family arrangements are foreign trusts for US purposes even where nobody involved would describe them that way.',
    details: [
      {
        heading: 'Gifts and inheritances',
        body: 'Not taxable as such, but reportable above a threshold, with a penalty calculated on the amount received rather than on any tax due.',
      },
      {
        heading: 'Arrangements that are trusts without the name',
        body: 'Some foreign pension and savings structures meet the US definition of a foreign trust regardless of what they are called locally.',
      },
    ],
    relatedServices: ['delinquent-submissions', 'foreign-pensions', 'foreign-trusts-gifts', 'gift-estate-tax'],
    relatedForms: ['3520-a', '8938', '709'],
    reviewStatus: 'draft',
  },
  {
    slug: '3520-a',
    formNumber: '3520-A',
    officialName: 'Annual Information Return of Foreign Trust With a US Owner',
    group: 'Trusts, Gifts & Estates',
    title: 'Form 3520-A (Foreign Trust Annual Return)',
    seoTitle: 'Form 3520-A: Foreign Trust Annual Return',
    seoDescription:
      'Form 3520-A is the annual return of a foreign trust with a US owner, with an earlier deadline than Form 3520.',
    summary: 'The trust’s own annual return where it has a US owner — and it is due earlier.',
    whoFilesIt:
      'Foreign trusts with a US owner; in practice the US owner is responsible for ensuring it is filed.',
    whatItReports: 'The trust’s income, assets and distributions.',
    whenDue: 'Earlier in the year than Form 3520, which is a common source of missed deadlines.',
    penaltyRisk:
      'A penalty based on the value of trust assets applies, and the earlier deadline means it is missed more often than most.',
    overview:
      'Form 3520-A is filed by the trust rather than by you, but where the trustee is a foreign institution with no US obligations of its own, responsibility falls back on the US owner in practice. Its deadline falls earlier in the year than Form 3520, and that mismatch is one of the most common causes of penalty in this area — people reasonably assume both are due at the same time as their return.',
    details: [
      {
        heading: 'The earlier deadline',
        body: 'It does not share the Form 3520 deadline. Diarising it separately is the practical protection against a penalty that is otherwise easy to incur.',
      },
    ],
    relatedServices: ['foreign-trusts-gifts'],
    relatedForms: ['3520'],
    reviewStatus: 'draft',
  },
  {
    slug: '709',
    formNumber: '709',
    officialName: 'United States Gift (and Generation-Skipping Transfer) Tax Return',
    group: 'Trusts, Gifts & Estates',
    title: 'Form 709 (Gift Tax)',
    seoTitle: 'Form 709: US Gift Tax Return',
    seoDescription:
      'Form 709 reports lifetime gifts above the annual exclusion, including gifts to a non-citizen spouse.',
    summary: 'Reports lifetime gifts above the annual exclusion.',
    whoFilesIt: 'US persons making gifts above the annual exclusion to any one recipient in a year.',
    whatItReports: 'Gifts made and the lifetime exemption applied against them.',
    whenDue: 'Annually, aligned with the income tax filing date.',
    penaltyRisk:
      'Unreported gifts complicate the eventual estate computation, since the lifetime exemption used is tracked across your lifetime.',
    overview:
      'Filing Form 709 rarely produces tax, because gifts above the annual exclusion generally draw against a large lifetime exemption rather than creating an immediate liability. The filing still matters: the exemption used is tracked cumulatively and feeds into the estate computation later. For cross-border families there is an additional trap, since the unlimited marital deduction available between US citizens does not apply in the same way to a non-citizen spouse.',
    details: [
      {
        heading: 'Gifts to a non-citizen spouse',
        body: 'A separate and much smaller annual allowance applies in place of the unlimited marital deduction, so routine transfers between spouses can become reportable.',
      },
    ],
    relatedServices: ['gift-estate-tax'],
    relatedForms: ['706', '3520'],
    reviewStatus: 'draft',
  },
  {
    slug: '706',
    formNumber: '706',
    officialName: 'United States Estate (and Generation-Skipping Transfer) Tax Return',
    group: 'Trusts, Gifts & Estates',
    title: 'Form 706 (Estate Tax)',
    seoTitle: 'Form 706: US Estate Tax Return',
    seoDescription:
      'Form 706 is the US estate tax return, applying to a citizen’s worldwide estate wherever they lived.',
    summary: 'The estate tax return — applying to a US citizen’s worldwide estate.',
    whoFilesIt: 'Executors of estates above the filing threshold, and in some cases to make an election.',
    whatItReports: 'The worldwide estate of a US citizen, or the US-situs estate of a non-resident.',
    whenDue: 'Within a set period after death, extendable.',
    penaltyRisk:
      'Missing an available election can permanently forfeit exemption that would otherwise transfer to a surviving spouse.',
    overview:
      'US citizens remain within the estate tax system wherever they live, and the return reaches worldwide assets. Cross-border estates are complicated by the other country taxing the same assets on a different basis, and by estate tax treaties being far fewer than income tax treaties. A return is also sometimes filed where no tax is due purely to make an election preserving unused exemption for a surviving spouse — an opportunity that disappears if the deadline passes.',
    details: [
      {
        heading: 'Filing to preserve exemption',
        body: 'An election can transfer unused exemption to a surviving spouse, but it requires a timely return even where no tax is payable.',
      },
    ],
    relatedServices: ['gift-estate-tax'],
    relatedForms: ['709', '3520'],
    reviewStatus: 'draft',
  },

  /* ------------------------------ Compliance Programs & Expatriation ----- */
  {
    slug: '14653',
    formNumber: '14653',
    officialName: 'Certification by US Person Residing Outside of the United States',
    group: 'Compliance Programs & Expatriation',
    title: 'Form 14653 (Streamlined Foreign Certification)',
    seoTitle: 'Form 14653: Streamlined Foreign Offshore Certification',
    seoDescription:
      'Form 14653 is the non-wilfulness certification for the streamlined foreign offshore procedures.',
    summary: 'The certification that accompanies a streamlined submission from outside the US.',
    whoFilesIt: 'Taxpayers using the streamlined foreign offshore procedures.',
    whatItReports: 'A sworn narrative explaining why the failure to file was not wilful.',
    whenDue: 'With the streamlined submission.',
    penaltyRisk:
      'Signed under penalty of perjury. An inadequate or inaccurate narrative can undermine the entire submission.',
    overview:
      'Form 14653 is the heart of a streamlined submission from abroad. It is not a tick-box exercise: it requires a narrative of your personal circumstances explaining how the failure to file arose and why it was not wilful, signed under penalty of perjury. This is the element the IRS scrutinises, and a generic or template account is the most common weakness in an otherwise sound submission.',
    details: [
      {
        heading: 'What the narrative must cover',
        body: 'Your specific background and understanding, how the obligation came to be missed, the sources of advice you relied on, and how you came to discover the position.',
      },
    ],
    relatedServices: ['streamlined-filing'],
    relatedForms: ['14654', 'fbar', '1040'],
    reviewStatus: 'draft',
  },
  {
    slug: '14654',
    formNumber: '14654',
    officialName: 'Certification by US Person Residing in the United States',
    group: 'Compliance Programs & Expatriation',
    title: 'Form 14654 (Streamlined Domestic Certification)',
    seoTitle: 'Form 14654: Streamlined Domestic Offshore Certification',
    seoDescription:
      'Form 14654 is the certification for the streamlined domestic offshore procedures, which carry a miscellaneous penalty.',
    summary: 'The certification for the domestic streamlined track, which carries a penalty the foreign track does not.',
    whoFilesIt: 'Taxpayers using the streamlined domestic offshore procedures.',
    whatItReports: 'The non-wilfulness narrative and the computation of the applicable penalty.',
    whenDue: 'With the streamlined submission.',
    penaltyRisk:
      'The domestic track carries a miscellaneous offshore penalty that the foreign track does not, computed on the relevant asset base.',
    overview:
      'The domestic track applies to taxpayers who do not meet the non-residency requirement, and it differs from the foreign track in a way that matters financially: it carries a miscellaneous offshore penalty computed against the relevant foreign asset base. Which track applies is determined by the residency test rather than chosen, and establishing it correctly is a necessary first step rather than a preference.',
    details: [
      {
        heading: 'Why the track matters',
        body: 'The foreign track waives the miscellaneous penalty; the domestic one does not. The applicable track follows the residency test rather than the taxpayer’s choice.',
      },
    ],
    relatedServices: ['streamlined-filing'],
    relatedForms: ['14653', 'fbar', '1040'],
    reviewStatus: 'draft',
  },
  {
    slug: '8854',
    formNumber: '8854',
    officialName: 'Initial and Annual Expatriation Statement',
    group: 'Compliance Programs & Expatriation',
    title: 'Form 8854 (Expatriation)',
    seoTitle: 'Form 8854: US Expatriation Statement',
    seoDescription:
      'Form 8854 is filed on giving up US citizenship or long-term residency, and certifies five years of tax compliance.',
    summary: 'Filed when you give up citizenship or long-term residency — and certifies five years of compliance.',
    whoFilesIt: 'Citizens who have renounced, and long-term residents who have surrendered their status.',
    whatItReports: 'Your net worth, tax liability history, and certification of five years of compliance.',
    whenDue: 'For the year of expatriation, with the return for that year.',
    penaltyRisk:
      'Failing to file, or being unable to certify compliance, can itself make you a covered expatriate regardless of wealth.',
    overview:
      'Form 8854 is what makes expatriation effective for tax purposes — renouncing at a consulate does not complete the process on its own. It determines whether you are a covered expatriate, which can trigger tax as though you had sold your worldwide assets the day before leaving. One of the tests is simply whether you can certify five years of tax compliance, which means someone behind on filings can fall into the regime on that basis alone, regardless of their net worth.',
    details: [
      {
        heading: 'The compliance certification',
        body: 'Being unable to certify five years of filings is sufficient on its own to make you a covered expatriate, which is why catching up generally precedes any decision to renounce.',
      },
      {
        heading: 'Renouncing is not the final step',
        body: 'The consular act does not complete expatriation for tax purposes. Without this filing the tax relationship does not cleanly end.',
      },
    ],
    relatedServices: ['expatriation'],
    relatedForms: ['1040', '1040-nr'],
    reviewStatus: 'draft',
  },
]
