import type { Service } from '@/types/content'

/**
 * Service pages serve people browsing by WHAT THEY NEED.
 * `group` drives mega-menu columns and index-page sections.
 *
 * COMPLIANCE: no specific figures, thresholds, deadlines or penalty sums.
 * All copy is reviewStatus: 'draft' pending professional review.
 */
export const services: Service[] = [
  /* ---------------------------------------------------------------- Annual */
  {
    slug: 'expat-tax-returns',
    title: 'US Expat Tax Return Preparation',
    group: 'Annual Compliance',
    seoTitle: 'US Expat Tax Return Preparation',
    seoDescription:
      'Annual US federal tax return preparation for Americans living abroad, including foreign income, exclusions and credits.',
    summary:
      'Your annual US federal return, prepared for the realities of living and earning outside the United States.',
    whoItIsFor: [
      'US citizens and green card holders living outside the US',
      'Anyone with foreign salary, self-employment or investment income',
      'People whose previous preparer was not an expat specialist',
    ],
    theRisk:
      'An unfiled or incorrectly prepared return leaves the filing period open indefinitely and can forfeit relief you were entitled to claim.',
    howWeHelp:
      'We prepare the federal return end to end, choose between the exclusion and the credit on the numbers rather than by habit, and file the related foreign account reports alongside it.',
    overview:
      'A US return prepared from abroad is a different exercise from a domestic one. Foreign salary has to be converted and characterised correctly, foreign tax paid has to be tracked to be usable, and the choice between excluding income and crediting foreign tax against it changes your result for years ahead rather than only this one. Returns prepared by generalists frequently claim the wrong relief, omit required account reporting, or miss credits that carry forward.',
    details: [
      {
        heading: 'What is included',
        body: 'Preparation of your federal return with all schedules required by your situation, the related foreign account reports where thresholds are met, and a review of the position taken in prior years where those are available.',
      },
      {
        heading: 'How the process works',
        body: 'Everything is handled remotely. You complete a structured questionnaire, send documents securely through our client portal, and receive a draft for review before anything is filed. Nothing is submitted without your approval.',
      },
      {
        heading: 'Choosing exclusion or credit',
        body: 'The exclusion and the foreign tax credit are not interchangeable and the better option depends on where you live, what you earn and what you expect in future years. Switching between them is restricted once made, so the decision is taken deliberately rather than by default.',
      },
    ],
    relatedDivisions: ['individuals-families', 'green-card-holders', 'business'],
    relatedForms: ['1040', '2555', '1116', 'schedule-b', '1040-es', '4868', '8960', '8606'],
    relatedServices: ['fbar', 'fatca', 'feie-ftc', 'state-tax'],
    faqs: [
      {
        q: 'I owe nothing. Do I still have to file?',
        a: 'Yes. The filing requirement is based on your income level and filing status, not on whether tax is ultimately due. Many Americans abroad owe nothing and are still required to file.',
      },
      {
        q: 'Do you also handle my foreign account reporting?',
        a: 'Yes. Foreign account reports are prepared alongside the return so the two are consistent with each other.',
      },
      {
        q: 'Can you review how my previous returns were prepared?',
        a: 'Yes. Where prior returns are available we review the positions taken, since errors in earlier years often carry forward into the current one.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'fbar',
    title: 'FBAR Filing',
    group: 'Annual Compliance',
    seoTitle: 'FBAR Filing for US Expats (FinCEN 114)',
    seoDescription:
      'FBAR preparation and filing for Americans abroad. Report foreign bank and financial accounts correctly and on time.',
    summary:
      'Reporting your foreign bank and financial accounts to FinCEN, separately from your tax return.',
    whoItIsFor: [
      'US persons with financial accounts outside the United States',
      'Anyone with signature authority over an account they do not own',
      'People who did not realise an ordinary local current account counts',
    ],
    theRisk:
      'FBAR penalties are assessed per account and per year, and the non-wilful and wilful tiers differ enormously. This is one of the most heavily penalised reports in the system.',
    howWeHelp:
      'We identify every reportable account including the ones people routinely miss, aggregate them correctly, and file within the required window.',
    overview:
      'The FBAR is filed with FinCEN, not with the IRS, and it is separate from your tax return. It is triggered by the combined high balance of your foreign accounts during the year rather than by income, which is why people who owe no tax are still required to file it. The definition of a reportable account is much broader than most people expect: ordinary current accounts, pensions in some forms, certain insurance products and accounts you merely have authority over can all count.',
    details: [
      {
        heading: 'Which accounts are reportable',
        body: 'Bank accounts, brokerage accounts, certain pension and insurance arrangements, and accounts you have signature authority over without owning. An account held jointly with a non-US spouse is generally still reportable in full.',
      },
      {
        heading: 'How the threshold works',
        body: 'The test looks at the combined highest balance across all your foreign accounts at any point during the year, not the balance at year end and not the balance of any single account. Money moved between accounts can therefore be counted more than once.',
      },
      {
        heading: 'If you have missed previous years',
        body: 'Late FBARs should not simply be filed quietly. There are specific procedures for delinquent reports, and which one fits depends on your circumstances and whether tax was also unpaid.',
      },
    ],
    relatedDivisions: ['individuals-families', 'catch-up', 'green-card-holders'],
    relatedForms: ['fbar', '8938', 'schedule-b'],
    relatedServices: ['fatca', 'delinquent-submissions', 'expat-tax-returns', 'streamlined-filing'],
    faqs: [
      {
        q: 'Is the FBAR the same as Form 8938?',
        a: 'No. They are separate reports with different thresholds, different definitions and different filing destinations. Many people have to file both, and filing one does not satisfy the other.',
      },
      {
        q: 'Does my joint account with a non-US spouse count?',
        a: 'Generally yes, and usually at its full value rather than your share. Joint accounts are one of the most commonly missed categories.',
      },
      {
        q: 'What if I have never filed an FBAR?',
        a: 'There are established procedures for catching up. The right one depends on whether tax was also underpaid and on the circumstances of the omission.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'fatca',
    title: 'FATCA Reporting',
    group: 'Annual Compliance',
    seoTitle: 'FATCA Reporting & Form 8938 for Expats',
    seoDescription:
      'FATCA reporting of specified foreign financial assets on Form 8938, filed with your US tax return.',
    summary:
      'Reporting specified foreign financial assets on Form 8938, filed with your return.',
    whoItIsFor: [
      'US persons holding foreign financial assets above the reporting thresholds',
      'Anyone whose foreign bank has asked them to confirm US status',
      'People who already file an FBAR and may also need Form 8938',
    ],
    theRisk:
      'Failure to file Form 8938 carries its own penalty and can hold the statute of limitations open on your entire return, not just on the unreported asset.',
    howWeHelp:
      'We determine whether you meet the thresholds that apply to your filing status and residence, identify reportable assets, and file Form 8938 with your return.',
    overview:
      'FATCA is the reason foreign banks now ask their customers whether they are US persons. Financial institutions outside the US report account information on US account holders, and separately you report specified foreign financial assets yourself on Form 8938. Because the institution is reporting in parallel, a mismatch between what they report and what you file is visible, which makes accuracy here more consequential than the form itself suggests.',
    details: [
      {
        heading: 'How it differs from the FBAR',
        body: 'Form 8938 covers a broader class of assets than the FBAR, including some interests that are not accounts at all, and its thresholds vary by filing status and whether you live abroad. The two reports overlap substantially but neither replaces the other.',
      },
      {
        heading: 'Why bank letters arrive',
        body: 'A letter asking you to confirm US status is a routine consequence of FATCA, not an accusation. It does, however, mean your account details are being reported, which makes becoming compliant the sensible response.',
      },
    ],
    relatedDivisions: ['individuals-families', 'catch-up', 'green-card-holders'],
    relatedForms: ['8938', 'fbar', '8621'],
    relatedServices: ['fbar', 'expat-tax-returns', 'streamlined-filing', 'pfic'],
    faqs: [
      {
        q: 'My bank sent me a FATCA letter. Am I in trouble?',
        a: 'No. These letters are sent routinely to anyone the bank identifies as potentially a US person. It does mean your information is being reported, so it is a good prompt to confirm your filing position.',
      },
      {
        q: 'Do I file both Form 8938 and the FBAR?',
        a: 'Often yes. They have different thresholds and cover overlapping but distinct sets of assets, so each has to be assessed separately.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'state-tax',
    title: 'State Tax & Residency Exit',
    group: 'Annual Compliance',
    seoTitle: 'US State Tax & Residency Exit for Expats',
    seoDescription:
      'Breaking state residency when moving abroad. Guidance on state filing obligations for Americans overseas.',
    summary:
      'Breaking residency with your US state, and handling state filing obligations that survive a move abroad.',
    whoItIsFor: [
      'People moving abroad from a state that is difficult to leave',
      'Expats still receiving state tax notices after departure',
      'Anyone retaining property, licences or ties in a former home state',
    ],
    theRisk:
      'Some states continue to treat you as a resident until you affirmatively break domicile. Leaving the country does not automatically end a state obligation.',
    howWeHelp:
      'We assess your residency position state by state, identify the ties that keep it alive, and handle part-year or non-resident filings where required.',
    overview:
      'Federal and state tax are separate systems, and moving abroad ends neither automatically. Several states apply a domicile test that looks at your intentions and your continuing connections rather than simply at where you physically are. Retaining a home, a driving licence, voter registration or bank accounts can all be read as evidence that you never left, sometimes years after departure.',
    details: [
      {
        heading: 'States that are harder to leave',
        body: 'A number of states apply an intention-based domicile test and continue to assert residency until they are satisfied it has been broken. The practical steps required differ by state and are far easier to take before departure than afterwards.',
      },
      {
        heading: 'Ongoing state source income',
        body: 'Rental property, business interests or other income sourced to a state can create a filing requirement there even once residency has genuinely ended.',
      },
    ],
    relatedDivisions: ['relocation', 'individuals-families'],
    relatedForms: ['1040', '1040-nr'],
    relatedServices: ['relocation', 'tax-planning', 'expat-tax-returns'],
    faqs: [
      {
        q: 'I moved abroad years ago but still get state letters. Why?',
        a: 'Some states treat you as resident until domicile is affirmatively broken. Remaining ties are usually the cause, and the position can generally be corrected.',
      },
    ],
    reviewStatus: 'draft',
  },

  /* -------------------------------------------------------- Catch-up ----- */
  {
    slug: 'streamlined-filing',
    title: 'Streamlined Filing (SFOP / SDOP)',
    group: 'Catch-Up & Amnesty',
    seoTitle: 'Streamlined Filing Compliance Procedures for Expats',
    seoDescription:
      'Specialist help with the IRS streamlined filing compliance procedures for Americans who are behind on US tax returns.',
    summary:
      'The IRS procedures designed for taxpayers whose failure to file was not wilful.',
    whoItIsFor: [
      'US persons several years behind on returns or foreign account reports',
      'People who did not know a filing obligation existed',
      'Anyone wanting to become compliant through a defined procedure',
    ],
    theRisk:
      'Filing late returns outside a formal procedure forfeits the penalty relief the procedure provides, and that choice cannot usually be undone afterwards.',
    howWeHelp:
      'We assess whether the procedures fit your facts, prepare the required returns and reports, and draft the certification that accompanies them.',
    overview:
      'The streamlined procedures exist because large numbers of Americans abroad did not know they were required to file. They provide a defined route to becoming compliant for taxpayers whose failure to file was not wilful, with reduced or eliminated penalties. There are separate tracks for people living outside the United States and people living inside it, and the requirements differ between them. Eligibility rests on a certification about your own conduct that you sign under penalty of perjury, which is why it is assessed carefully rather than assumed.',
    details: [
      {
        heading: 'What the procedures require',
        body: 'A set number of prior-year returns, a longer run of foreign account reports, payment of any tax and interest due, and a signed certification explaining why the failure to file was not wilful.',
      },
      {
        heading: 'Why the certification matters',
        body: 'The certification is the heart of the submission. It is a sworn statement about your conduct and understanding, and it is the element the IRS scrutinises. It is prepared from your actual circumstances, never from a template.',
      },
      {
        heading: 'Filing quietly is not a substitute',
        body: 'Simply submitting late returns without entering a procedure — sometimes called a quiet disclosure — does not carry the protection the procedures offer and can worsen the position.',
      },
    ],
    relatedDivisions: ['catch-up', 'green-card-holders'],
    relatedForms: ['14653', '14654', 'fbar', '1040', '8938'],
    relatedServices: ['delinquent-submissions', 'amended-returns', 'fbar', 'irs-representation'],
    faqs: [
      {
        q: 'How do I know if I qualify?',
        a: 'Eligibility depends on a certification about your own conduct and on facts specific to you. It is assessed individually, and no website can tell you whether you qualify.',
      },
      {
        q: 'Will coming forward draw attention to me?',
        a: 'These are established procedures used by very large numbers of people. The alternative — being identified through bank reporting — generally leaves fewer options available.',
      },
      {
        q: 'How many years have to be filed?',
        a: 'The procedures specify a set number of years of returns and a longer period for foreign account reports. The exact requirements depend on which track applies to you.',
      },
    ],
    requiresDisclaimer: true,
    reviewStatus: 'draft',
  },
  {
    slug: 'delinquent-submissions',
    title: 'Delinquent FBAR & Information Return Procedures',
    group: 'Catch-Up & Amnesty',
    seoTitle: 'Delinquent FBAR & Information Return Procedures',
    seoDescription:
      'Catching up on missed FBARs and late international information returns through the appropriate IRS procedure.',
    summary:
      'Routes for taxpayers who missed foreign account reports or information returns but whose tax was otherwise correct.',
    whoItIsFor: [
      'People who filed and paid correctly but missed FBARs',
      'Taxpayers who omitted an international information return',
      'Anyone whose omission was reporting-only, with no unpaid tax',
    ],
    theRisk:
      'Information return penalties are frequently automatic and assessed per form and per year, even where no tax was ever owed.',
    howWeHelp:
      'We establish which procedure fits, prepare the delinquent reports, and draft the reasonable-cause statement where one is required.',
    overview:
      'Not every catch-up situation needs the streamlined procedures. Where your income was reported and your tax was paid but a foreign account report or information return was missed, narrower routes exist specifically for that situation. Choosing the correct one matters: applying a procedure that does not fit your facts can create problems that the omission itself did not.',
    details: [
      {
        heading: 'Delinquent FBAR submission',
        body: 'For taxpayers who were not required to file under another procedure, properly reported all income, and simply did not file the FBAR. A statement of the reason for the late filing accompanies the submission.',
      },
      {
        heading: 'Delinquent information returns',
        body: 'For missed international information returns such as entity or trust reporting where tax was correctly paid. These generally require a reasonable-cause statement to accompany the late form.',
      },
    ],
    relatedDivisions: ['catch-up', 'business', 'private-client'],
    relatedForms: ['fbar', '5471', '3520', '8938', '8865'],
    relatedServices: ['streamlined-filing', 'fbar', 'foreign-entities', 'irs-representation'],
    faqs: [
      {
        q: 'My tax was always paid; I just never filed FBARs. What applies?',
        a: 'That is the situation the delinquent FBAR route is designed for. Which procedure fits depends on the full picture, including whether any income was unreported.',
      },
    ],
    requiresDisclaimer: true,
    reviewStatus: 'draft',
  },
  {
    slug: 'amended-returns',
    title: 'Prior-Year & Amended Returns',
    group: 'Catch-Up & Amnesty',
    seoTitle: 'Amended & Prior-Year US Tax Returns for Expats',
    seoDescription:
      'Correcting previously filed US returns and completing prior-year filings for Americans abroad.',
    summary:
      'Correcting returns that were filed incorrectly, and completing years that were never filed.',
    whoItIsFor: [
      'People whose previous preparer missed foreign income or relief',
      'Anyone who has discovered an error in a filed return',
      'Taxpayers who claimed the wrong relief and lost credits as a result',
    ],
    theRisk:
      'An uncorrected error compounds. Credits computed incorrectly carry forward wrongly for years, and unreported income keeps the filing period open.',
    howWeHelp:
      'We review prior returns, identify what was missed, and prepare amendments — or advise when amending would be the wrong move.',
    overview:
      'Returns prepared without expat expertise commonly go wrong in predictable ways: the exclusion claimed where the credit would have been better, foreign tax credits miscalculated or not carried forward, foreign accounts omitted entirely, or foreign pensions treated as if they were domestic. Some of these are worth correcting and some are better addressed through a formal catch-up procedure instead. That assessment comes before any amendment is prepared.',
    details: [
      {
        heading: 'When amending is the right step',
        body: 'Where income was reported and the error is one of computation or relief, an amendment is usually appropriate. Where income or accounts were omitted entirely, a catch-up procedure may be the better route.',
      },
      {
        heading: 'Time limits',
        body: 'Claiming a refund from an earlier year is subject to time limits. Where a correction would produce a refund, the sooner it is assessed the more likely it remains available.',
      },
    ],
    relatedDivisions: ['catch-up', 'individuals-families'],
    relatedForms: ['1040-x', '1040', '1116', '2555'],
    relatedServices: ['streamlined-filing', 'expat-tax-returns', 'feie-ftc'],
    faqs: [
      {
        q: 'My old accountant never mentioned FBARs. Can that be fixed?',
        a: 'Usually yes. Whether that is handled by amending returns or through a catch-up procedure depends on whether income was also unreported.',
      },
    ],
    reviewStatus: 'draft',
  },

  /* --------------------------------------------- Avoiding double taxation */
  {
    slug: 'feie-ftc',
    title: 'Foreign Earned Income Exclusion & Foreign Tax Credit',
    group: 'Avoiding Double Taxation',
    seoTitle: 'FEIE & Foreign Tax Credit for US Expats',
    seoDescription:
      'Choosing correctly between the foreign earned income exclusion and the foreign tax credit, and claiming both properly.',
    summary:
      'The two mechanisms that stop the same income being taxed twice — and choosing correctly between them.',
    whoItIsFor: [
      'Americans earning a salary or self-employment income abroad',
      'Anyone paying tax in their country of residence on that income',
      'People who have always claimed the exclusion without testing the alternative',
    ],
    theRisk:
      'Choosing the wrong mechanism can cost significantly more tax, and switching away from the exclusion once claimed is restricted for a number of years.',
    howWeHelp:
      'We model both routes against your actual figures, apply the one that serves you better over time, and preserve credits that carry forward.',
    overview:
      'Two mechanisms prevent double taxation, and they work very differently. The exclusion removes a capped amount of foreign earned income from US tax altogether. The credit instead offsets US tax by foreign tax you have already paid, and unused credit can carry forward. Which is better depends on how heavily your country taxes you, what kind of income you have, and whether you want to preserve the ability to make retirement contributions or claim certain credits. The exclusion is the default many preparers reach for, and it is frequently not the better answer.',
    details: [
      {
        heading: 'Where the exclusion tends to win',
        body: 'Typically in low-tax or no-tax jurisdictions, where there is little foreign tax available to credit against your US liability.',
      },
      {
        heading: 'Where the credit tends to win',
        body: 'Typically in higher-tax countries, where foreign tax paid exceeds the US tax on the same income. The credit can also preserve access to refundable credits and retirement contributions that the exclusion removes.',
      },
      {
        heading: 'Switching is restricted',
        body: 'Revoking the exclusion once claimed prevents you from claiming it again for a number of years without permission. The decision therefore has a longer horizon than a single return.',
      },
    ],
    relatedDivisions: ['individuals-families', 'relocation', 'business'],
    relatedForms: ['2555', '1116', '2350', '1040'],
    relatedServices: ['expat-tax-returns', 'tax-treaties', 'totalization', 'amended-returns'],
    faqs: [
      {
        q: 'Which one is better for me?',
        a: 'It depends on your country of residence, income type and future plans. Both are modelled against your actual figures rather than chosen by rule of thumb.',
      },
      {
        q: 'Can I claim both?',
        a: 'They can be combined in some situations, but not against the same income. Getting the interaction right is where most of the value lies.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'tax-treaties',
    title: 'Tax Treaty Analysis',
    group: 'Avoiding Double Taxation',
    seoTitle: 'US Tax Treaty Analysis for Expats',
    seoDescription:
      'Analysis and disclosure of US tax treaty positions, including treaty-based return positions on Form 8833.',
    summary:
      'Applying the treaty between the US and your country of residence, and disclosing the position correctly.',
    whoItIsFor: [
      'Expats in countries with a US tax treaty',
      'Anyone with pension, dividend or royalty income affected by treaty rates',
      'People taking a treaty position that requires formal disclosure',
    ],
    theRisk:
      'A treaty position taken without the required disclosure carries its own penalty, even where the position itself is correct.',
    howWeHelp:
      'We identify which treaty articles apply to your income, apply them correctly, and prepare the disclosure where one is required.',
    overview:
      'The United States has treaties with many countries which allocate taxing rights and can reduce or eliminate tax on particular categories of income. For US citizens their effect is narrowed by the saving clause, which preserves the US right to tax its own citizens as if the treaty did not exist, subject to specific exceptions. Treaty work is therefore about identifying which exceptions genuinely apply rather than assuming the treaty solves the problem.',
    details: [
      {
        heading: 'The saving clause',
        body: 'Most US treaties reserve the right to tax US citizens regardless of the treaty, with listed exceptions. Those exceptions are where the practical benefit for an American abroad usually lies.',
      },
      {
        heading: 'When disclosure is required',
        body: 'Certain treaty-based positions must be disclosed on a specific form with the return. Failure to disclose is penalised separately from the underlying tax position.',
      },
    ],
    relatedDivisions: ['individuals-families', 'private-client'],
    relatedForms: ['8833', '1116', '1040'],
    relatedServices: ['feie-ftc', 'foreign-pensions', 'totalization', 'expat-tax-returns'],
    faqs: [
      {
        q: 'Does the treaty mean I do not pay US tax?',
        a: 'Rarely for US citizens. The saving clause preserves US taxing rights over citizens, with specific exceptions that have to be identified case by case.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'totalization',
    title: 'Self-Employment Tax & Totalization Agreements',
    group: 'Avoiding Double Taxation',
    seoTitle: 'Self-Employment Tax & Totalization Agreements',
    seoDescription:
      'US self-employment tax for expats and how totalization agreements prevent paying social security twice.',
    summary:
      'Preventing social security contributions being paid to two countries on the same earnings.',
    whoItIsFor: [
      'Self-employed Americans abroad',
      'Freelancers and consultants paying local social contributions',
      'Business owners paying themselves from a foreign company',
    ],
    theRisk:
      'Self-employment tax is not removed by the foreign earned income exclusion. Many expats correctly exclude their income and still face an unexpected US liability.',
    howWeHelp:
      'We determine whether a totalization agreement covers you, obtain the coverage certificate where appropriate, and compute the position correctly.',
    overview:
      'The foreign earned income exclusion removes income from income tax, but not from self-employment tax. Self-employed Americans abroad therefore frequently find they owe US tax despite having excluded all of their earnings. Totalization agreements between the US and a number of countries resolve this by assigning social security coverage to one country only, so contributions are not owed to both. Whether an agreement applies, and which country it assigns you to, depends on your circumstances and is evidenced by a certificate of coverage.',
    details: [
      {
        heading: 'Why the exclusion does not help',
        body: 'The exclusion applies to income tax. Self-employment tax is computed separately and is unaffected by it, which is the source of most unexpected liabilities in this area.',
      },
      {
        heading: 'Certificates of coverage',
        body: 'Where an agreement applies, a certificate issued by the relevant authority evidences which country you contribute to. It is obtained from that country rather than from the IRS.',
      },
    ],
    relatedDivisions: ['business', 'individuals-families'],
    relatedForms: ['schedule-c-se', '1040', '8833'],
    relatedServices: ['feie-ftc', 'foreign-entities', 'expat-tax-returns', 'tax-treaties'],
    faqs: [
      {
        q: 'I excluded all my income. Why do I still owe?',
        a: 'Almost certainly self-employment tax, which the exclusion does not remove. A totalization agreement may apply depending on where you live.',
      },
    ],
    reviewStatus: 'draft',
  },

  /* ------------------------------------------------ Foreign income/assets */
  {
    slug: 'foreign-pensions',
    title: 'Foreign Pensions & Retirement Accounts',
    group: 'Foreign Income & Assets',
    seoTitle: 'US Tax on Foreign Pensions & Retirement Accounts',
    seoDescription:
      'How US tax treats foreign pensions and retirement accounts, including UK SIPPs, Australian superannuation and Canadian RRSPs.',
    summary:
      'How the US treats your foreign retirement savings — which is often not as a pension at all.',
    whoItIsFor: [
      'Expats contributing to a local workplace or personal pension',
      'Holders of UK SIPPs, Australian superannuation or Canadian RRSPs',
      'Anyone approaching drawdown on a non-US retirement account',
    ],
    theRisk:
      'A foreign pension not recognised as a pension for US purposes can be taxable on growth as it accrues, and may carry trust or fund reporting obligations.',
    howWeHelp:
      'We characterise the arrangement for US purposes, apply any treaty relief available, and handle the reporting that follows.',
    overview:
      'Tax relief granted by your country of residence does not automatically carry over to the US. Depending on how the arrangement is structured, the US may treat it as a trust, as a collection of investments, or as a pension eligible for treaty protection. The consequences differ enormously: in the worst case, growth inside an account that is tax-free locally is taxable in the US as it arises, with additional reporting attached. The correct treatment turns on the specific arrangement rather than on its local name.',
    details: [
      {
        heading: 'Why local tax-free status does not transfer',
        body: 'The US applies its own characterisation. An account that is tax-advantaged where you live may be treated as a foreign trust or as directly held investments for US purposes unless a treaty provides otherwise.',
      },
      {
        heading: 'Treaty relief',
        body: 'Some treaties contain pension articles that can defer US tax on growth within a qualifying arrangement. Availability depends on the country, the treaty and the specific type of account.',
      },
      {
        heading: 'Reporting consequences',
        body: 'Foreign pensions can trigger foreign account reporting, and in some structures fund or trust reporting as well. These obligations exist independently of whether anything is currently taxable.',
      },
    ],
    relatedDivisions: ['individuals-families', 'private-client', 'relocation'],
    relatedForms: ['8938', 'fbar', '8621', '3520', '8833'],
    relatedServices: ['tax-treaties', 'pfic', 'fatca', 'tax-planning'],
    faqs: [
      {
        q: 'My pension is tax-free here. Is it tax-free in the US?',
        a: 'Not necessarily. The US applies its own characterisation, and relief depends on the treaty and the structure of the arrangement.',
      },
      {
        q: 'Do I have to report my pension even if I take nothing from it?',
        a: 'Often yes. Reporting obligations can apply during the accumulation phase, separately from any tax liability.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'pfic',
    title: 'PFIC Reporting (Foreign Funds)',
    group: 'Foreign Income & Assets',
    seoTitle: 'PFIC Reporting for US Expats (Form 8621)',
    seoDescription:
      'PFIC reporting for Americans holding foreign mutual funds, ETFs and investment trusts. Form 8621 preparation and election advice.',
    summary:
      'The punitive regime that applies to ordinary foreign investment funds held by US persons.',
    whoItIsFor: [
      'Expats holding non-US mutual funds, ETFs or investment trusts',
      'Anyone whose local adviser recommended a domestic fund',
      'Holders of funds inside a foreign pension or insurance wrapper',
    ],
    theRisk:
      'The default PFIC regime applies an interest charge on top of tax at the highest ordinary rates, and can consume a large share of a gain. Each fund requires its own annual form.',
    howWeHelp:
      'We identify PFIC holdings, compute the position under the available elections, and prepare the required forms.',
    overview:
      'A PFIC is, in practice, almost any pooled investment fund established outside the United States. This catches products that are completely ordinary where you live — a European UCITS fund, a UK investment trust, an ISA holding funds, an Australian managed fund. Under the default regime, gains and certain distributions are taxed at the highest ordinary rates with an interest charge applied as though the tax had been deferred, which can produce an effective rate far above anything that would apply to an equivalent US fund. Elections exist that change the treatment, but they generally have to be made in time and require information the fund may not publish.',
    details: [
      {
        heading: 'What counts as a PFIC',
        body: 'Most non-US pooled funds, including those held inside pension and insurance wrappers. Direct holdings in individual shares are not PFICs; funds that hold those shares generally are.',
      },
      {
        heading: 'The elections',
        body: 'Elections can replace the default regime with annual taxation of income or of unrealised gains. Each has conditions, each is generally better made early, and one depends on the fund providing information many foreign funds do not produce.',
      },
      {
        heading: 'Per-fund reporting',
        body: 'Reporting is generally required for each PFIC held, so a portfolio of several funds produces several forms. This is a significant part of the compliance cost of holding them.',
      },
    ],
    relatedDivisions: ['individuals-families', 'private-client'],
    relatedForms: ['8621', '8938', 'fbar'],
    relatedServices: ['foreign-pensions', 'fatca', 'tax-planning', 'foreign-property'],
    faqs: [
      {
        q: 'My bank recommended these funds. Are they really a problem?',
        a: 'Local advisers are generally not assessing US tax consequences. Ordinary local funds are frequently PFICs for a US person.',
      },
      {
        q: 'Should I sell my PFICs?',
        a: 'Sometimes, but the timing and the method matter, and disposal has its own consequences. It is a decision to take with advice rather than immediately.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'foreign-property',
    title: 'Foreign Rental Property & Home Sales',
    group: 'Foreign Income & Assets',
    seoTitle: 'US Tax on Foreign Rental Property & Home Sales',
    seoDescription:
      'US reporting of overseas rental income and gains on selling a foreign home, including currency and depreciation issues.',
    summary:
      'Reporting overseas rental income and gains on selling a home outside the United States.',
    whoItIsFor: [
      'Americans renting out property abroad',
      'Anyone selling a home outside the United States',
      'Expats who kept a US property after moving abroad',
    ],
    theRisk:
      'Foreign property is subject to US depreciation rules that differ from local ones, and currency movement alone can create a taxable gain where local rules see none.',
    howWeHelp:
      'We report rental income under US rules, apply the correct depreciation basis, and compute gains including the currency effect.',
    overview:
      'Rental income from a property abroad is reported on your US return under US rules, not the rules of the country where the property sits. Depreciation is mandatory for US purposes and is calculated over a period specific to foreign property, which commonly differs from local treatment. On sale, the gain is computed in dollars, so exchange rate movement between purchase and sale forms part of the result — a property sold for the same local price it was bought for can still produce a US gain. Where a mortgage is denominated in a foreign currency, repaying it can produce a separate gain of its own.',
    details: [
      {
        heading: 'Depreciation',
        body: 'US rules require depreciation on rental property and apply a recovery period for foreign property that often differs from local practice. It is not optional, and unclaimed depreciation is still recaptured on sale.',
      },
      {
        heading: 'Currency on sale',
        body: 'Gain is computed in US dollars using the rates at purchase and at sale, so currency movement is part of the taxable result even where the local-currency price is unchanged.',
      },
      {
        heading: 'The main home exclusion',
        body: 'The exclusion for gain on a principal residence can apply to a home abroad where its conditions are met, and it interacts with foreign tax credits on the same gain.',
      },
    ],
    relatedDivisions: ['individuals-families', 'private-client'],
    relatedForms: ['schedule-e', '1116', '1040'],
    relatedServices: ['feie-ftc', 'expat-tax-returns', 'tax-planning', 'pfic'],
    faqs: [
      {
        q: 'I sold for what I paid. Why is there a US gain?',
        a: 'Because the calculation is made in dollars. Exchange rate movement between purchase and sale can produce a gain even where the local price did not change.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'equity-compensation',
    title: 'Equity Compensation (RSUs, Options)',
    group: 'Foreign Income & Assets',
    seoTitle: 'US Tax on RSUs & Stock Options for Expats',
    seoDescription:
      'Cross-border tax treatment of RSUs, stock options and employee share plans for Americans working abroad.',
    summary:
      'RSUs, options and share plans taxed across two countries with different timing rules.',
    whoItIsFor: [
      'Employees holding RSUs or options while working abroad',
      'Anyone who moved country during a vesting period',
      'People in employee share purchase plans outside the US',
    ],
    theRisk:
      'The two countries often tax the same award at different moments, so foreign tax credits may not line up with the US liability without planning.',
    howWeHelp:
      'We source each award across the countries it was earned in, align the timing, and position the credits so relief is not lost.',
    overview:
      'Equity awards are taxed by reference to where the work was performed over the vesting period, which means an award can be split across two countries. The difficulty is timing: countries frequently tax at different events — grant, vest, exercise or sale — so foreign tax paid in one year may relate to income the US taxes in another. Without planning, the credit and the liability fall in different years and relief is lost. Moving country mid-vest makes this more acute.',
    details: [
      {
        heading: 'Sourcing across a vesting period',
        body: 'Awards are generally allocated by where services were performed between grant and vest, so a move during that window splits the income between jurisdictions.',
      },
      {
        heading: 'Timing mismatches',
        body: 'Where the two countries tax at different events, foreign tax credits can fall in a different year from the US liability. Identifying this in advance is usually the only way to avoid losing relief.',
      },
    ],
    relatedDivisions: ['business', 'relocation', 'individuals-families'],
    relatedForms: ['1040', '1116', '8938'],
    relatedServices: ['relocation', 'tax-planning', 'feie-ftc', 'expat-tax-returns'],
    faqs: [
      {
        q: 'I moved country while my RSUs were vesting. How are they taxed?',
        a: 'Generally split by where you worked across the vesting period, with each country taxing its portion. The timing of each country’s charge determines whether credits align.',
      },
    ],
    reviewStatus: 'draft',
  },

  /* -------------------------------------------------- Business & entities */
  {
    slug: 'foreign-entities',
    title: 'Foreign Company Reporting (5471 / 8865 / 8858)',
    group: 'Business & Entities',
    seoTitle: 'Foreign Company Reporting: Forms 5471, 8865 & 8858',
    seoDescription:
      'US information reporting for Americans who own foreign corporations, partnerships or disregarded entities.',
    summary:
      'Annual information reporting for Americans who own or control a company outside the United States.',
    whoItIsFor: [
      'Owners and part-owners of foreign corporations',
      'Partners in non-US partnerships',
      'Anyone operating through a foreign entity, including single-member ones',
    ],
    theRisk:
      'These returns carry substantial automatic penalties for late filing, assessed per form and per year regardless of whether any tax was due.',
    howWeHelp:
      'We determine which returns your structure requires, prepare them from your local accounts, and address missed prior years.',
    overview:
      'Owning a business abroad as a US person creates annual reporting that is separate from, and additional to, your personal return. Which form applies depends on how the entity is classified for US purposes, which is not always the same as its local classification — and in some cases can be elected. These are information returns rather than tax returns, so they are due even when the business made no profit and distributed nothing, and the penalties attach to the late filing itself rather than to any underpayment.',
    details: [
      {
        heading: 'Which form applies',
        body: 'Corporations, partnerships and disregarded entities each have their own return. US classification can differ from local classification, and an election may be available that changes it.',
      },
      {
        heading: 'Reporting is not optional on a dormant company',
        body: 'The obligation follows ownership and control, not profitability. Dormant and loss-making entities are routinely still reportable.',
      },
      {
        heading: 'If prior years were missed',
        body: 'Missed information returns have their own catch-up route, usually requiring a reasonable-cause statement with the late forms.',
      },
    ],
    relatedDivisions: ['business', 'private-client'],
    relatedForms: ['5471', '8865', '8858', '926', '8992'],
    relatedServices: ['gilti', 'delinquent-submissions', 'totalization', 'tax-planning'],
    faqs: [
      {
        q: 'My company made no profit. Do I still file?',
        a: 'Generally yes. These are information returns driven by ownership and control, not by profitability.',
      },
      {
        q: 'My local accountant says everything is fine.',
        a: 'Local accountants are not usually expected to know US entity reporting. Local compliance and US compliance are separate questions.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'gilti',
    title: 'GILTI & Subpart F Planning',
    group: 'Business & Entities',
    seoTitle: 'GILTI & Subpart F Planning for Expat Business Owners',
    seoDescription:
      'GILTI and Subpart F planning for Americans owning foreign companies, including election and structuring options.',
    summary:
      'Planning for the regimes that can tax your foreign company’s profits before you take them out.',
    whoItIsFor: [
      'Owners of profitable foreign companies',
      'Americans running a consultancy or practice through a local company',
      'Anyone facing US tax on profits left inside their business',
    ],
    theRisk:
      'GILTI can tax company profits in your hands in the year they arise, even where nothing was distributed and the cash remains in the business.',
    howWeHelp:
      'We compute the exposure, evaluate the available elections and structuring responses, and implement the one that suits your situation.',
    overview:
      'GILTI was aimed at large multinationals but is drafted broadly enough to catch individual Americans running ordinary businesses abroad. Where it applies, profits earned inside your foreign company can be taxed to you personally in the year they are earned, regardless of whether you took them out. Individual shareholders do not automatically receive the reliefs available to corporate ones, which is why the response usually involves an election or a structural change rather than simply computing the number.',
    details: [
      {
        heading: 'Why individuals are hit harder',
        body: 'Several of the mechanisms that reduce the impact for corporate shareholders are not automatically available to individuals, so the same profits can produce a materially worse result.',
      },
      {
        heading: 'Elections and structuring',
        body: 'Elections exist that change how the income is taxed in your hands. Which is appropriate depends on your rates, your country of residence and your plans for the business.',
      },
      {
        heading: 'Subpart F',
        body: 'A separate and older regime that can also attribute company income to you, typically where the income is passive or has particular characteristics. The two regimes interact and are assessed together.',
      },
    ],
    relatedDivisions: ['business', 'private-client'],
    relatedForms: ['8992', '5471', '1116'],
    relatedServices: ['foreign-entities', 'tax-planning', 'feie-ftc'],
    faqs: [
      {
        q: 'I left the profits in my company. Why am I taxed?',
        a: 'GILTI can attribute company profits to you in the year they arise regardless of distribution. Elections may change the result.',
      },
    ],
    reviewStatus: 'draft',
  },

  /* ------------------------------------------- Family, trusts and estates */
  {
    slug: 'non-us-spouse',
    title: 'Non-US Spouse & Family Filing',
    group: 'Family, Trusts & Estates',
    seoTitle: 'Filing US Taxes with a Non-US Spouse',
    seoDescription:
      'US tax filing where one spouse is not a US person, including filing status choices and children’s credits.',
    summary:
      'Filing choices where one spouse is a US person and the other is not.',
    whoItIsFor: [
      'Americans married to a non-US citizen',
      'Couples deciding whether to include the non-US spouse on a US return',
      'Parents claiming credits for children born abroad',
    ],
    theRisk:
      'Electing to include a non-US spouse brings their worldwide income and their foreign accounts into the US system — a decision that is difficult to reverse.',
    howWeHelp:
      'We model the filing status options, assess the reporting consequences of each, and apply the one that works for your household.',
    overview:
      'Where one spouse is not a US person, the filing status decision carries more weight than it does domestically. Including them can produce a better immediate rate, but it brings their worldwide income into US tax and their foreign accounts into US reporting, and the election cannot simply be reversed year to year. Filing separately avoids that but uses a less favourable rate structure. There is also a separate status available to some people supporting a child, which is frequently overlooked.',
    details: [
      {
        heading: 'The election to include a non-US spouse',
        body: 'Treating a non-US spouse as a US person for tax purposes brings their income and accounts into scope. Revocation is restricted, so the decision is a long-term one.',
      },
      {
        heading: 'Children and credits',
        body: 'Credits for children depend on the child’s status and documentation. Whether a child born abroad qualifies, and for which credit, needs confirming rather than assuming.',
      },
    ],
    relatedDivisions: ['individuals-families'],
    relatedForms: ['1040', 'schedule-8812', 'fbar', '8938'],
    relatedServices: ['expat-tax-returns', 'fbar', 'gift-estate-tax', 'tax-planning'],
    faqs: [
      {
        q: 'Should I include my non-US spouse on my return?',
        a: 'Sometimes it helps and sometimes it is costly, because it brings their income and accounts into US scope. It is modelled both ways before deciding.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'foreign-trusts-gifts',
    title: 'Foreign Trusts, Gifts & Inheritances',
    group: 'Family, Trusts & Estates',
    seoTitle: 'Foreign Trusts, Gifts & Inheritances: US Reporting',
    seoDescription:
      'US reporting of foreign trusts, large foreign gifts and overseas inheritances, including Forms 3520 and 3520-A.',
    summary:
      'Reporting foreign trusts, substantial gifts from abroad, and overseas inheritances.',
    whoItIsFor: [
      'Beneficiaries, settlors and trustees of non-US trusts',
      'Anyone receiving a large gift or inheritance from outside the US',
      'Families holding wealth through non-US structures',
    ],
    theRisk:
      'The penalties here are among the most severe in the code and are calculated by reference to the amount involved, even though receiving an inheritance is not itself taxable.',
    howWeHelp:
      'We establish what the arrangement is for US purposes, prepare the required reporting, and address missed years where they exist.',
    overview:
      'Receiving an inheritance or a gift from abroad is generally not taxable to the recipient — but it is reportable once it exceeds a threshold, and the penalty for failing to report is calculated against the amount received. Foreign trusts carry heavier obligations still, with reporting falling on settlors, beneficiaries and in some cases the trustee. Arrangements that are not called trusts locally can nonetheless be foreign trusts for US purposes, including certain pension and savings structures, which is how most people arrive at this unexpectedly.',
    details: [
      {
        heading: 'Gifts and inheritances from abroad',
        body: 'Not taxable to the recipient as such, but reportable above a threshold. The penalty for not reporting is calculated on the amount received, which makes an omission expensive despite no tax being due.',
      },
      {
        heading: 'What counts as a foreign trust',
        body: 'US classification does not follow local labels. Some pension, savings and family arrangements are foreign trusts for US purposes even where nobody involved would describe them that way.',
      },
      {
        heading: 'Distributions to beneficiaries',
        body: 'Distributions from a foreign trust have their own reporting and can carry accumulated income with punitive treatment attached. Records of what the trust holds and when it earned it matter considerably.',
      },
    ],
    relatedDivisions: ['private-client', 'individuals-families'],
    relatedForms: ['3520', '3520-a', '8938'],
    relatedServices: ['gift-estate-tax', 'tax-planning', 'delinquent-submissions', 'foreign-pensions'],
    faqs: [
      {
        q: 'I inherited money from a relative abroad. Do I owe US tax?',
        a: 'Generally the inheritance itself is not taxable to you, but it is reportable above a threshold, and the penalty for not reporting is based on the amount.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'gift-estate-tax',
    title: 'US Gift & Estate Tax',
    group: 'Family, Trusts & Estates',
    seoTitle: 'US Gift & Estate Tax for Expats and Cross-Border Families',
    seoDescription:
      'US gift and estate tax for Americans abroad and cross-border families, including non-US spouse considerations.',
    summary:
      'US gift and estate tax as it applies to Americans abroad and to cross-border families.',
    whoItIsFor: [
      'Americans abroad making substantial lifetime gifts',
      'Couples where one spouse is not a US citizen',
      'Families planning an estate across more than one country',
    ],
    theRisk:
      'The unlimited marital deduction does not apply to a non-US citizen spouse in the usual way, which can expose transfers that would be free of tax domestically.',
    howWeHelp:
      'We assess exposure across both jurisdictions, coordinate with your legal advisers, and prepare the required returns.',
    overview:
      'US citizens remain within the US gift and estate system wherever they live. The complication in cross-border families is that transfers between spouses, which are generally unrestricted where both are US citizens, are treated differently when the recipient spouse is not. Planning also has to account for the estate rules of the other country, which may tax the same assets on a different basis and with different reliefs, and treaty coverage in this area is narrower than for income tax.',
    details: [
      {
        heading: 'Transfers to a non-citizen spouse',
        body: 'The unrestricted marital deduction is not available in the usual form where the recipient spouse is not a US citizen. Alternative routes exist but require deliberate structuring.',
      },
      {
        heading: 'Coordination with local rules',
        body: 'The other country may tax the same estate on a different basis. Estate and gift tax treaties are fewer than income tax treaties, so overlap is more common.',
      },
    ],
    relatedDivisions: ['private-client', 'individuals-families'],
    relatedForms: ['709', '706', '3520'],
    relatedServices: ['foreign-trusts-gifts', 'tax-planning', 'non-us-spouse', 'expatriation'],
    faqs: [
      {
        q: 'Can I give assets to my non-US spouse freely?',
        a: 'Not in the same way as between US citizens. The usual unlimited marital deduction does not apply, and transfers need planning.',
      },
    ],
    reviewStatus: 'draft',
  },

  /* --------------------------------------------- Life changes & advisory */
  {
    slug: 'relocation',
    title: 'Moving Abroad / Returning to the US (Dual-Status)',
    group: 'Life Changes & Advisory',
    seoTitle: 'Dual-Status Returns: Moving Abroad or Returning to the US',
    seoDescription:
      'Dual-status tax returns and planning for the year you move abroad or return to the United States.',
    summary:
      'The tax year you move — when residency starts or ends partway through it.',
    whoItIsFor: [
      'Anyone moving abroad or returning to the US this year',
      'People whose residency changed partway through a tax year',
      'Green card holders ending or beginning US residency',
    ],
    theRisk:
      'A dual-status year follows different rules from an ordinary one, and several deductions and filing statuses available normally are not available in it.',
    howWeHelp:
      'We establish your residency start and end dates, prepare the dual-status filing, and plan the timing of income around the move.',
    overview:
      'In the year you arrive in or depart from the US tax system, you can be a resident for part of the year and a non-resident for the rest. That changes which income is taxable and how it is reported, and it restricts some of the options available in a normal year. Because the split is determined by specific residency rules rather than by the date you got on the plane, the timing of income, asset sales and account changes around a move has a direct effect on the outcome — and is far easier to influence beforehand.',
    details: [
      {
        heading: 'How the year splits',
        body: 'Residency start and end dates are set by statutory tests rather than by the physical move. Income is then allocated either side of that date and taxed differently on each side.',
      },
      {
        heading: 'What a dual-status year restricts',
        body: 'Certain filing statuses and deductions available in an ordinary year are not available in a dual-status one. Knowing this in advance can change the best timing for a move.',
      },
    ],
    relatedDivisions: ['relocation', 'green-card-holders'],
    relatedForms: ['1040-nr', '1040', '2350', '2555'],
    relatedServices: ['state-tax', 'tax-planning', 'expat-tax-returns', 'equity-compensation'],
    faqs: [
      {
        q: 'What is a dual-status return?',
        a: 'A return for a year in which you were a US resident for part of the year and a non-resident for the rest, with different rules applying to each period.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'expatriation',
    title: 'Renunciation & Expatriation Tax',
    group: 'Life Changes & Advisory',
    seoTitle: 'Renunciation & US Expatriation Tax (Exit Tax)',
    seoDescription:
      'US exit tax and expatriation reporting for citizens renouncing and long-term green card holders surrendering residency.',
    summary:
      'The tax consequences of giving up US citizenship or surrendering a long-held green card.',
    whoItIsFor: [
      'US citizens considering renunciation',
      'Long-term green card holders planning to surrender the card',
      'Anyone wanting to understand the cost before deciding',
    ],
    theRisk:
      'Falling into covered expatriate status can trigger a deemed sale of worldwide assets, and being behind on filings is itself one of the ways people fall into it.',
    howWeHelp:
      'We assess whether you would be treated as a covered expatriate, identify what can be addressed beforehand, and prepare the expatriation filings.',
    overview:
      'Giving up US citizenship or long-term residency is a tax event in its own right. Where certain tests are met, you are treated as a covered expatriate, which can trigger tax as though you had sold your worldwide assets the day before you left. One of the tests is simply whether you can certify five years of tax compliance, which means people who are behind on filings can land in the regime regardless of their wealth. Nearly everything that can be done about this has to be done before renouncing, not after.',
    details: [
      {
        heading: 'The covered expatriate tests',
        body: 'Separate tests based on net worth, average tax liability and the ability to certify five years of compliance. Meeting any one of them is enough.',
      },
      {
        heading: 'The compliance test catches people unexpectedly',
        body: 'Being unable to certify five years of filings is sufficient on its own, which is why catching up generally comes before any decision about renunciation.',
      },
      {
        heading: 'Timing',
        body: 'Most planning opportunities exist only before expatriation. Once the step is taken, the position is largely fixed.',
      },
    ],
    relatedDivisions: ['green-card-holders', 'private-client'],
    relatedForms: ['8854', '1040', '1040-nr'],
    relatedServices: ['streamlined-filing', 'tax-planning', 'gift-estate-tax', 'expat-tax-returns'],
    faqs: [
      {
        q: 'Will I have to pay an exit tax?',
        a: 'Only if you meet one of the covered expatriate tests. One of them is about filing compliance rather than wealth, which catches people unexpectedly.',
      },
      {
        q: 'I am behind on filings and want to renounce.',
        a: 'Being unable to certify five years of compliance can itself make you a covered expatriate, so catching up normally comes first.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'tax-planning',
    title: 'Tax Planning & Consultations',
    group: 'Life Changes & Advisory',
    seoTitle: 'US Expat Tax Planning & Consultations',
    seoDescription:
      'Advisory consultations and forward tax planning for Americans abroad, covering moves, investments and business structure.',
    summary:
      'Advice before a decision, rather than reporting after it.',
    whoItIsFor: [
      'Anyone planning a move, a sale or a change of structure',
      'People wanting a second opinion on their current position',
      'Investors and business owners wanting to avoid predictable problems',
    ],
    theRisk:
      'Most expensive expat tax outcomes were avoidable at the planning stage and irreversible by the time they appear on a return.',
    howWeHelp:
      'A structured consultation that reviews your position, models the options and gives you a written summary you can act on.',
    overview:
      'Compliance work reports what already happened. Planning changes what happens. The decisions that matter most for Americans abroad — when to move, how to hold investments, whether to incorporate, when to sell, whether to renounce — have tax consequences that are straightforward to manage in advance and often impossible to undo afterwards. A consultation is also the right starting point if you simply want to know whether your current arrangements are sound.',
    details: [
      {
        heading: 'What a consultation covers',
        body: 'A review of your current position, the specific questions you bring, modelling of the realistic options, and a written summary of the recommendations.',
      },
      {
        heading: 'Common planning points',
        body: 'Timing a relocation, restructuring investments away from punitive treatment, choosing a business structure, equity award timing, and preparing for expatriation.',
      },
    ],
    relatedDivisions: ['private-client', 'business', 'relocation'],
    relatedForms: ['1040', '1116', '8621'],
    relatedServices: ['relocation', 'pfic', 'gilti', 'expatriation', 'gift-estate-tax'],
    faqs: [
      {
        q: 'Can I book a consultation without becoming a filing client?',
        a: 'Yes. Advisory consultations are available on their own, and many people use one to confirm their current position is sound.',
      },
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'irs-representation',
    title: 'IRS Notices & Representation',
    group: 'Life Changes & Advisory',
    seoTitle: 'IRS Notices & Representation for Expats',
    seoDescription:
      'Responding to IRS notices, penalty abatement requests and representation for Americans living abroad.',
    summary:
      'Responding to IRS correspondence and dealing with the IRS on your behalf.',
    whoItIsFor: [
      'Anyone who has received an IRS notice abroad',
      'Taxpayers facing penalties they believe are incorrect',
      'People under examination or with an unresolved account issue',
    ],
    theRisk:
      'Notices carry response deadlines, and mail to an overseas address is frequently delayed or never arrives. Missing a window narrows the options available.',
    howWeHelp:
      'We interpret the notice, prepare the response, request abatement where grounds exist, and deal with the IRS directly on your behalf.',
    overview:
      'IRS correspondence is written in a register that is difficult to interpret and usually carries a deadline. For people abroad the practical problem is compounded by post: notices arrive late or not at all, and the first a taxpayer hears of an issue can be a second or third letter. Many notices are routine and some are simply wrong, but all of them need a timely and correctly framed response. Where penalties have been assessed, there are established grounds on which abatement can be requested.',
    details: [
      {
        heading: 'Penalty abatement',
        body: 'Penalties can be challenged on reasonable-cause grounds, and in some cases on the basis of a clean prior compliance history. The grounds have to be matched to the specific penalty.',
      },
      {
        heading: 'Acting for you',
        body: 'With authorisation we can correspond with the IRS directly, which removes the delay and difficulty of handling it from another timezone.',
      },
    ],
    relatedDivisions: ['catch-up', 'business', 'individuals-families'],
    relatedForms: ['1040', '1040-x', 'fbar'],
    relatedServices: ['amended-returns', 'streamlined-filing', 'delinquent-submissions'],
    faqs: [
      {
        q: 'I received an IRS notice but the deadline has passed.',
        a: 'Act anyway. Late responses are frequently still accepted, particularly where overseas postal delay contributed, and options usually remain.',
      },
    ],
    reviewStatus: 'draft',
  },
]
