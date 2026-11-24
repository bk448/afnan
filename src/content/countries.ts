import type { Country } from '@/types/content'

/**
 * Country pages share one template, per the sitemap's structural note:
 * treaty position · local pension treatment · local vs US deadlines ·
 * common PFIC traps · booking CTA.
 *
 * COMPLIANCE: no rates, no thresholds, no dates. Qualitative framing only.
 */
export const countries: Country[] = [
  {
    slug: 'uk',
    countryName: 'the UK',
    title: 'US Taxes in the UK',
    seoTitle: 'US Taxes for Americans in the UK',
    seoDescription:
      'US tax for Americans living in the UK: the US-UK treaty, SIPP and workplace pension treatment, ISAs as PFICs, and dual filing deadlines.',
    summary:
      'Americans in the UK face two full tax systems with different year ends, and a pension and ISA landscape that US rules treat very differently from HMRC.',
    treaty:
      'The US and the UK have a comprehensive income tax treaty, together with a separate agreement covering social security. For US citizens its effect is narrowed by the saving clause, which preserves the US right to tax its own citizens; the practical benefit lies in the specific carve-outs, which for UK residents most often concern pensions.',
    pensions:
      'UK pensions are the central issue for Americans here. Workplace schemes and SIPPs are tax-advantaged under UK rules, but US treatment depends on characterisation and on whether treaty relief applies to the particular arrangement. Employer contributions and growth within the fund are not automatically disregarded for US purposes. Where a SIPP holds funds, the underlying holdings raise PFIC questions separately from the pension wrapper itself.',
    deadlines:
      'The UK tax year does not align with the US calendar year, so income has to be reapportioned rather than copied across. The two systems also have different filing and payment dates, and UK tax paid in one period may relate to US income in another — which affects when foreign tax credits become usable.',
    pficTraps:
      'ISAs are the most common trap. They are tax-free under UK rules but carry no US recognition, and a stocks and shares ISA holding funds is generally a collection of PFICs. UK investment trusts, OEICs and unit trusts fall into the same category. Many Americans in the UK hold these on perfectly sensible local advice without any awareness of the US consequence.',
    localNotes: [
      {
        heading: 'National Insurance and self-employment',
        body: 'The social security agreement between the two countries can assign contributions to one system only, which matters for self-employed Americans who would otherwise face charges in both.',
      },
      {
        heading: 'Property',
        body: 'UK residential property sold at a gain is computed in dollars for US purposes, so sterling movement forms part of the result. A foreign-currency mortgage repaid on sale can create a separate gain of its own.',
      },
    ],
    relatedServices: [
      'expat-tax-returns',
      'foreign-pensions',
      'pfic',
      'feie-ftc',
      'tax-treaties',
      'fbar',
      'totalization',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'canada',
    countryName: 'Canada',
    title: 'US Taxes in Canada',
    seoTitle: 'US Taxes for Americans in Canada',
    seoDescription:
      'US tax for Americans in Canada: the US-Canada treaty, RRSP and TFSA treatment, and the PFIC problem with Canadian mutual funds.',
    summary:
      'Canada has one of the most developed treaty relationships with the US, but TFSAs and Canadian mutual funds remain significant problems.',
    treaty:
      'The US-Canada treaty is among the most comprehensive the US has, with well-established provisions covering pensions, cross-border employment and the relief of double taxation. Canada is also one of the jurisdictions where treaty-based pension deferral is clearest.',
    pensions:
      'RRSPs generally receive recognised treatment, with deferral of US tax on growth inside the plan available without the elaborate elections once required. TFSAs are the opposite case: tax-free in Canada, with no US recognition at all, and frequently treated as foreign trusts or as holding PFICs depending on what is inside them. RESPs raise similar questions.',
    deadlines:
      'Both countries use a calendar tax year, which removes the apportionment problem that affects the UK and Australia. Filing and payment dates still differ, and Canadian tax paid can land in a different period from the US liability it is meant to relieve.',
    pficTraps:
      'Canadian mutual funds and most Canadian ETFs are PFICs. Holdings inside a TFSA or an RESP are caught in the same way. Canadians commonly hold these through ordinary bank investment accounts on local advice.',
    localNotes: [
      {
        heading: 'Cross-border workers',
        body: 'Americans who live in one country and work in the other face sourcing questions that the treaty addresses specifically, and that affect which country taxes first.',
      },
    ],
    relatedServices: [
      'expat-tax-returns',
      'foreign-pensions',
      'pfic',
      'tax-treaties',
      'feie-ftc',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'australia',
    countryName: 'Australia',
    title: 'US Taxes in Australia',
    seoTitle: 'US Taxes for Americans in Australia',
    seoDescription:
      'US tax for Americans in Australia: superannuation treatment, the July-to-June tax year, and Australian managed funds as PFICs.',
    summary:
      'Superannuation is the defining issue for Americans in Australia, and the mismatched tax years complicate everything else.',
    treaty:
      'The US and Australia have an income tax treaty and a social security agreement. The treaty does not contain a clear pension article resolving superannuation, which is the single largest source of uncertainty for Americans living here.',
    pensions:
      'Superannuation has no settled US characterisation. Depending on the fund and the analysis applied, it may be treated as a foreign trust, as an employees’ trust, or as directly held investments — with very different consequences for whether employer contributions and internal growth are taxable as they arise. Self-managed super funds raise additional entity and reporting questions.',
    deadlines:
      'The Australian tax year runs from July to June and does not align with the US calendar year, so income and Australian tax paid must be reapportioned rather than transferred directly. This timing difference also affects when foreign tax credits can be used.',
    pficTraps:
      'Australian managed funds and listed investment companies are generally PFICs, including those held inside superannuation. Where super is treated as holding investments directly, the PFIC rules can reach through the wrapper to the underlying holdings.',
    localNotes: [
      {
        heading: 'Franking credits',
        body: 'Australian franking credits have no direct US equivalent, and their interaction with the foreign tax credit requires care rather than assumption.',
      },
    ],
    relatedServices: [
      'foreign-pensions',
      'pfic',
      'expat-tax-returns',
      'tax-treaties',
      'feie-ftc',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'germany',
    countryName: 'Germany',
    title: 'US Taxes in Germany',
    seoTitle: 'US Taxes for Americans in Germany',
    seoDescription:
      'US tax for Americans in Germany: the US-German treaty, pension pillar treatment, and German and European funds as PFICs.',
    summary:
      'Germany taxes at rates that usually make the foreign tax credit the better choice, but its layered pension system needs careful US analysis.',
    treaty:
      'The US-Germany treaty is comprehensive and includes pension provisions that are more developed than in many other treaties. Germany also has a social security agreement with the US covering contributions for employed and self-employed people.',
    pensions:
      'The German system has distinct layers — statutory, occupational and private — and each requires separate US analysis. Occupational arrangements in particular can take forms that the US may characterise as trusts. Treaty pension provisions may assist, but availability depends on the specific arrangement rather than on the layer alone.',
    deadlines:
      'Both countries use a calendar tax year. German filing deadlines and the timing of assessments differ from the US, and German tax finalised late can affect which US year a foreign tax credit belongs to.',
    pficTraps:
      'German and wider European funds, including UCITS funds and most European ETFs, are PFICs for US purposes. These are the ordinary default investments recommended by German banks and advisers.',
    relatedServices: [
      'feie-ftc',
      'foreign-pensions',
      'pfic',
      'tax-treaties',
      'expat-tax-returns',
      'totalization',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'france',
    countryName: 'France',
    title: 'US Taxes in France',
    seoTitle: 'US Taxes for Americans in France',
    seoDescription:
      'US tax for Americans in France: the US-France treaty, assurance vie, social charges and French funds as PFICs.',
    summary:
      'France has unusually favourable treaty provisions for Americans, but assurance vie and social charges need careful handling.',
    treaty:
      'The US-France treaty contains provisions that are notably helpful to US citizens compared with most other treaties, particularly in how certain categories of income are allocated. It is one of the treaties where careful analysis most often produces a materially better result.',
    pensions:
      'French pension arrangements require individual analysis, with treaty provisions potentially assisting depending on the type. Assurance vie, although widely used in France as a long-term savings and succession vehicle, has no automatic US recognition and may be treated as holding PFICs or as a foreign trust depending on its structure.',
    deadlines:
      'Both countries use a calendar tax year. French filing and assessment timing differs from the US, which affects when French tax paid becomes creditable for US purposes.',
    pficTraps:
      'French SICAVs, FCPs and European UCITS funds are PFICs. Funds held within an assurance vie wrapper can be caught through the wrapper depending on how it is characterised.',
    localNotes: [
      {
        heading: 'Social charges',
        body: 'Whether French social charges are creditable against US tax has been contested and the position has developed over time. It is worth confirming rather than assuming either way.',
      },
    ],
    relatedServices: [
      'tax-treaties',
      'feie-ftc',
      'pfic',
      'foreign-pensions',
      'expat-tax-returns',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'switzerland',
    countryName: 'Switzerland',
    title: 'US Taxes in Switzerland',
    seoTitle: 'US Taxes for Americans in Switzerland',
    seoDescription:
      'US tax for Americans in Switzerland: pillar 2 and pillar 3a pensions, cantonal variation and banking access under FATCA.',
    summary:
      'The Swiss pillar system and the practical difficulty of banking as an American define the position here.',
    treaty:
      'The US and Switzerland have an income tax treaty and a social security agreement. Swiss taxation operates at federal, cantonal and communal levels, so the effective rate — and therefore whether the credit or the exclusion is better — varies considerably by canton.',
    pensions:
      'The Swiss pillar system requires separate analysis by pillar. Pillar 2 occupational arrangements and pillar 3a private savings each have their own characteristics, and whether US tax deferral applies to growth within them depends on the arrangement rather than on the pillar label alone.',
    deadlines:
      'Both use a calendar tax year. Cantonal assessment timing varies and can be slow, which affects when Swiss tax is treated as paid or accrued for US credit purposes.',
    pficTraps:
      'Swiss and European funds are PFICs. Swiss banks commonly place clients in fund-based portfolios, and holdings within pillar 3a arrangements can be caught depending on characterisation.',
    localNotes: [
      {
        heading: 'Banking access',
        body: 'FATCA reporting obligations have made some Swiss institutions reluctant to serve US clients. This is a practical consequence rather than a tax one, but it shapes how Americans here hold assets.',
      },
    ],
    relatedServices: [
      'foreign-pensions',
      'feie-ftc',
      'pfic',
      'fatca',
      'tax-treaties',
      'expat-tax-returns',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'netherlands',
    countryName: 'the Netherlands',
    title: 'US Taxes in the Netherlands',
    seoTitle: 'US Taxes for Americans in the Netherlands',
    seoDescription:
      'US tax for Americans in the Netherlands: the expatriate ruling, box 3 deemed returns, Dutch pensions and European funds as PFICs.',
    summary:
      'The Dutch box system and the expatriate ruling for inbound employees interact with US rules in ways that need deliberate planning.',
    treaty:
      'The US and the Netherlands have a comprehensive treaty with developed pension provisions, alongside a social security agreement.',
    pensions:
      'Dutch occupational pensions are substantial and their US treatment depends on the arrangement. Treaty pension provisions may assist with deferral on growth, but the analysis is specific to the scheme rather than general to the country.',
    deadlines:
      'Both use a calendar tax year. Dutch assessment timing differs from the US and can affect the year in which Dutch tax becomes creditable.',
    pficTraps:
      'Dutch and European UCITS funds are PFICs. These are standard offerings through Dutch banks and investment platforms.',
    localNotes: [
      {
        heading: 'The expatriate ruling for inbound employees',
        body: 'The Dutch ruling for qualifying inbound employees exempts part of employment income from Dutch tax. The scope and duration of the relief have been narrowed in recent years, so the current terms should be confirmed rather than assumed. For a US citizen it cuts both ways: less Dutch tax paid means less foreign tax credit available, so it can improve the Dutch position while worsening the US one. The two need modelling together.',
      },
      {
        heading: 'Box 3 deemed returns',
        body: 'The Netherlands taxes certain assets on a deemed rather than actual return. Matching that against US tax on actual income is not straightforward and affects creditability.',
      },
    ],
    relatedServices: [
      'feie-ftc',
      'tax-treaties',
      'foreign-pensions',
      'pfic',
      'expat-tax-returns',
      'tax-planning',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'ireland',
    countryName: 'Ireland',
    title: 'US Taxes in Ireland',
    seoTitle: 'US Taxes for Americans in Ireland',
    seoDescription:
      'US tax for Americans in Ireland: the US-Ireland treaty, Irish pension treatment and Irish-domiciled funds as PFICs.',
    summary:
      'Ireland is a common base for Americans in Europe, and its fund industry makes PFIC exposure almost unavoidable without planning.',
    treaty:
      'The US and Ireland have an income tax treaty and a social security agreement. Irish effective rates are generally high enough that the foreign tax credit tends to be the stronger option for employment income.',
    pensions:
      'Irish occupational schemes, PRSAs and personal arrangements each require their own US analysis. Treaty provisions may assist with deferral depending on the arrangement.',
    deadlines:
      'Both use a calendar tax year. Irish self-assessment deadlines and the timing of payments differ from the US, affecting foreign tax credit timing.',
    pficTraps:
      'Ireland is a major domicile for European funds, so Irish-domiciled UCITS funds and ETFs are both very widely held and squarely within the PFIC rules. Irish investors are also subject to local deemed-disposal rules on funds, which interact awkwardly with US timing.',
    relatedServices: [
      'feie-ftc',
      'pfic',
      'foreign-pensions',
      'tax-treaties',
      'expat-tax-returns',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'spain',
    countryName: 'Spain',
    title: 'US Taxes in Spain',
    seoTitle: 'US Taxes for Americans in Spain',
    seoDescription:
      'US tax for Americans in Spain: the US-Spain treaty, the Beckham regime, wealth tax and Spanish funds as PFICs.',
    summary:
      'Spain combines high effective rates with regional variation and a wealth tax that has no US equivalent.',
    treaty:
      'The US and Spain have an income tax treaty, updated in recent years, and a social security agreement. Spanish taxation includes significant regional variation, so the position differs between autonomous communities.',
    pensions:
      'Spanish pension plans and the US treatment of contributions and growth require individual analysis. Americans arriving with US retirement accounts also need to consider how Spain treats those, which is a separate question from how the US treats Spanish ones.',
    deadlines:
      'Both use a calendar tax year. Spanish filing periods and payment timing differ from the US and affect credit timing.',
    pficTraps:
      'Spanish and European funds are PFICs. Spain’s domestic rules permit tax-free switching between funds, which encourages holdings that create repeated US consequences.',
    localNotes: [
      {
        heading: 'Wealth tax and asset reporting',
        body: 'Spain levies a wealth tax in some regions and requires extensive declaration of overseas assets. Neither has a US equivalent, and wealth tax is generally not creditable against US income tax.',
      },
      {
        heading: 'The Beckham regime',
        body: 'The special regime for inbound workers changes the Spanish basis of taxation, which in turn changes the foreign tax credit available for US purposes. The two need assessing together.',
      },
    ],
    relatedServices: [
      'feie-ftc',
      'tax-treaties',
      'pfic',
      'expat-tax-returns',
      'tax-planning',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'portugal',
    countryName: 'Portugal',
    title: 'US Taxes in Portugal',
    seoTitle: 'US Taxes for Americans in Portugal',
    seoDescription:
      'US tax for Americans in Portugal: treaty position, the NHR regime and why low Portuguese tax can increase US liability.',
    summary:
      'Portugal attracts Americans with favourable inbound regimes, which paradoxically can increase the US bill.',
    treaty:
      'The US and Portugal have an income tax treaty and a social security agreement. The treaty interacts in a particular way with Portugal’s special regimes for inbound residents.',
    pensions:
      'Portuguese pension arrangements require individual analysis. More commonly relevant is how Portugal taxes US retirement income for new residents, which has changed with successive versions of the inbound regimes.',
    deadlines:
      'Both use a calendar tax year, with different filing periods and payment timing.',
    pficTraps:
      'Portuguese and European funds are PFICs. Americans relocating here are often advised into European fund products locally.',
    localNotes: [
      {
        heading: 'Why a low local rate can cost you',
        body: 'Special regimes reduce Portuguese tax, which reduces the foreign tax credit available against US tax on the same income. For a US citizen the saving can accrue to the US Treasury rather than to the taxpayer, so the regimes are considerably less valuable than they appear.',
      },
    ],
    relatedServices: [
      'feie-ftc',
      'tax-treaties',
      'tax-planning',
      'pfic',
      'expat-tax-returns',
      'relocation',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'italy',
    countryName: 'Italy',
    title: 'US Taxes in Italy',
    seoTitle: 'US Taxes for Americans in Italy',
    seoDescription:
      'US tax for Americans in Italy: the US-Italy treaty, inbound regimes, IVIE and IVAFE and Italian funds as PFICs.',
    summary:
      'Italy taxes heavily and reports extensively, with specific levies on foreign property and financial assets.',
    treaty:
      'The US and Italy have an income tax treaty and a social security agreement. Italian effective rates generally favour the foreign tax credit over the exclusion for employment income.',
    pensions:
      'Italian pension arrangements require individual analysis, and the treatment of US retirement accounts for new Italian residents is a separate question that frequently matters more in practice.',
    deadlines:
      'Both use a calendar tax year, with different filing and payment schedules.',
    pficTraps:
      'Italian and European funds are PFICs, including those held through Italian banks and insurance-based investment products.',
    localNotes: [
      {
        heading: 'IVIE and IVAFE',
        body: 'Italy levies specific charges on foreign real estate and foreign financial assets held by residents. These are separate from income tax and their creditability for US purposes is not automatic.',
      },
      {
        heading: 'Inbound regimes',
        body: 'Italy offers favourable regimes for new residents. As elsewhere, reducing Italian tax reduces the credit available against US tax, so the net benefit to a US citizen is smaller than it appears.',
      },
    ],
    relatedServices: [
      'feie-ftc',
      'tax-treaties',
      'pfic',
      'expat-tax-returns',
      'tax-planning',
      'foreign-property',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'israel',
    countryName: 'Israel',
    title: 'US Taxes in Israel',
    seoTitle: 'US Taxes for Americans in Israel',
    seoDescription:
      'US tax for Americans in Israel: the US-Israel treaty, keren hishtalmut and pension treatment, and Israeli funds as PFICs.',
    summary:
      'Israel has one of the largest American populations abroad, and its savings vehicles have no US equivalents.',
    treaty:
      'The US and Israel have an income tax treaty. There is no comprehensive social security totalization agreement between the two countries, which matters for self-employed Americans who can face contributions in both systems.',
    pensions:
      'Israeli pension arrangements, including keren pensia and kupat gemel, require US analysis that does not follow their Israeli treatment. Keren hishtalmut, a medium-term savings vehicle with favourable Israeli treatment and no US analogue, is a particularly common source of difficulty.',
    deadlines:
      'Both use a calendar tax year. Israeli filing and assessment timing differs from the US.',
    pficTraps:
      'Israeli mutual funds and ETFs are PFICs, including holdings inside keren hishtalmut and similar vehicles depending on characterisation.',
    localNotes: [
      {
        heading: 'No totalization agreement',
        body: 'Without a social security agreement, self-employed Americans in Israel can face contribution obligations in both countries, with no mechanism assigning coverage to one.',
      },
      {
        heading: 'New immigrant exemptions',
        body: 'Israeli exemptions for new immigrants reduce Israeli tax and therefore the foreign tax credit, which can shift liability to the US rather than removing it.',
      },
    ],
    relatedServices: [
      'foreign-pensions',
      'pfic',
      'totalization',
      'expat-tax-returns',
      'feie-ftc',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'japan',
    countryName: 'Japan',
    title: 'US Taxes in Japan',
    seoTitle: 'US Taxes for Americans in Japan',
    seoDescription:
      'US tax for Americans in Japan: the US-Japan treaty, NISA and iDeCo treatment, and Japanese funds as PFICs.',
    summary:
      'Japan’s tax-advantaged savings accounts have no US recognition, and its inheritance tax reaches further than most.',
    treaty:
      'The US and Japan have a comprehensive income tax treaty and a social security agreement covering contributions.',
    pensions:
      'Japanese public and corporate pension arrangements require individual US analysis. iDeCo, the defined-contribution personal plan, is tax-advantaged in Japan but has no automatic US recognition.',
    deadlines:
      'Japan uses a calendar tax year for individuals, which simplifies apportionment, though filing and payment dates differ from the US.',
    pficTraps:
      'Japanese investment trusts and funds are PFICs, including holdings inside a NISA. The NISA wrapper is tax-free in Japan and carries no US benefit whatsoever.',
    localNotes: [
      {
        heading: 'Japanese inheritance tax',
        body: 'Japan’s inheritance and gift tax can apply to residents on worldwide assets depending on status and length of residence, and its interaction with US estate tax requires planning rather than assumption.',
      },
    ],
    relatedServices: [
      'expat-tax-returns',
      'pfic',
      'foreign-pensions',
      'tax-treaties',
      'gift-estate-tax',
      'feie-ftc',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'uae',
    countryName: 'the UAE',
    title: 'US Taxes in the UAE',
    seoTitle: 'US Taxes for Americans in the UAE',
    seoDescription:
      'US tax for Americans in Dubai and the UAE: no local income tax means no foreign tax credit, making the exclusion central.',
    summary:
      'With no local income tax there is nothing to credit, so the exclusion and careful planning carry the entire burden.',
    treaty:
      'There is no comprehensive US-UAE income tax treaty, and no social security agreement. Americans here therefore rely on domestic US relief rather than treaty provisions.',
    pensions:
      'End-of-service gratuities and employer savings schemes are the typical arrangements, and their US characterisation depends on structure. With no local tax to credit, the US treatment of these is the whole of the analysis rather than one side of it.',
    deadlines:
      'There is no personal income tax filing obligation in the UAE for most residents, so the US return is generally the only income tax filing. Corporate tax has been introduced for businesses and affects owners rather than employees.',
    pficTraps:
      'Offshore investment products sold through international advisers in the region are frequently PFICs, and often also carry foreign trust or insurance-wrapper characteristics. The expatriate advisory market here markets these heavily to Americans.',
    localNotes: [
      {
        heading: 'Why the exclusion matters more here',
        body: 'With no local income tax, there is no foreign tax credit available. The foreign earned income exclusion generally becomes the primary relief, and income above it is exposed to US tax with nothing to offset it.',
      },
      {
        heading: 'Self-employment exposure',
        body: 'With no totalization agreement, self-employed Americans face US self-employment tax that the exclusion does not remove and no agreement relieves.',
      },
    ],
    relatedServices: [
      'feie-ftc',
      'totalization',
      'pfic',
      'expat-tax-returns',
      'tax-planning',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'singapore',
    countryName: 'Singapore',
    title: 'US Taxes in Singapore',
    seoTitle: 'US Taxes for Americans in Singapore',
    seoDescription:
      'US tax for Americans in Singapore: no treaty, territorial taxation, CPF treatment and regional investment products as PFICs.',
    summary:
      'Singapore has no US tax treaty and taxes territorially, so low local tax frequently leaves a US liability behind.',
    treaty:
      'There is no comprehensive US-Singapore income tax treaty and no social security agreement. Relief depends entirely on domestic US provisions.',
    pensions:
      'CPF, the mandatory central provident fund, has no settled US characterisation. Employer and employee contributions and the interest credited within the account may be treated very differently for US purposes than they are locally.',
    deadlines:
      'Singapore uses a calendar tax year with its own filing timetable. Local rates are low, so credits are generally insufficient to eliminate US tax on the same income.',
    pficTraps:
      'Singapore and regional funds, and the investment-linked insurance products sold widely through the expatriate advisory market, are generally PFICs.',
    localNotes: [
      {
        heading: 'Territorial taxation',
        body: 'Singapore generally does not tax foreign-source income not remitted. The US taxes it regardless, so income untaxed locally is frequently fully exposed to US tax with no credit available.',
      },
    ],
    relatedServices: [
      'feie-ftc',
      'pfic',
      'foreign-pensions',
      'totalization',
      'expat-tax-returns',
      'tax-planning',
    ],
    reviewStatus: 'draft',
  },
  {
    slug: 'mexico',
    countryName: 'Mexico',
    title: 'US Taxes in Mexico',
    seoTitle: 'US Taxes for Americans in Mexico',
    seoDescription:
      'US tax for Americans in Mexico: the US-Mexico treaty, afore pensions, property held through a fideicomiso and PFIC traps.',
    summary:
      'Proximity makes Mexico a common choice for retirees and remote workers, with property structures that raise US questions.',
    treaty:
      'The US and Mexico have an income tax treaty and a social security agreement. The treaty addresses the allocation of taxing rights across the categories most relevant to cross-border residents.',
    pensions:
      'Afore accounts, the Mexican individual retirement system, require US analysis that does not follow their local treatment. Americans retiring here more commonly need the reverse analysis: how Mexico treats their US retirement income.',
    deadlines:
      'Both use a calendar tax year. Mexican filing and payment timing differs from the US and affects when credits become usable.',
    pficTraps:
      'Mexican investment funds are PFICs. Americans here more often hold US investments, which reduces exposure relative to Europe, but locally sold products remain a risk.',
    localNotes: [
      {
        heading: 'Property held through a fideicomiso',
        body: 'Coastal and border property is commonly held through a bank trust. Although the IRS has indicated these are not generally treated as foreign trusts requiring trust reporting, the position depends on the arrangement, and the underlying property still carries ordinary US reporting and gain consequences.',
      },
    ],
    relatedServices: [
      'expat-tax-returns',
      'foreign-property',
      'feie-ftc',
      'tax-treaties',
      'relocation',
      'fbar',
    ],
    reviewStatus: 'draft',
  },
]
