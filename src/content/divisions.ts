import type { Division } from '@/types/content'

/**
 * Division pages serve people browsing by WHO THEY ARE.
 * Each lists the services relevant to that persona.
 *
 * All copy is reviewStatus: 'draft' — structural placeholder content requiring
 * sign-off by a qualified tax professional before publication.
 */
export const divisions: Division[] = [
  {
    slug: 'individuals-families',
    title: 'Individuals & Families',
    seoTitle: 'US Tax for American Individuals & Families Abroad',
    seoDescription:
      'Annual US tax filing for Americans living abroad. Returns, FBAR and FATCA handled remotely by specialists in expatriate tax.',
    summary:
      'Straightforward annual US filing for Americans working and raising families overseas.',
    isThisYou: [
      'You are a US citizen employed or self-employed outside the United States',
      'You already pay tax where you live and want to avoid being taxed twice',
      'You hold bank or investment accounts outside the US',
      'You want your return and your foreign account reporting handled together',
      'You are up to date, or only a little behind, and want to stay that way',
    ],
    overview:
      'The United States taxes its citizens on worldwide income regardless of where they live. That means an annual federal return is due even when you pay full tax in your country of residence and even when nothing ends up owing. Most people in this position need three things handled consistently each year: the federal return itself, foreign account reporting, and the correct choice between the exclusions and credits that prevent double taxation.',
    reassurance:
      'For most families abroad this is routine work. The aim is a return that is correct, filed on time, and claims the relief you are entitled to — handled remotely, without you having to become an expert in two tax systems.',
    relatedServices: [
      'expat-tax-returns',
      'fbar',
      'fatca',
      'feie-ftc',
      'foreign-pensions',
      'non-us-spouse',
      'state-tax',
    ],
    relatedForms: ['1040', '2555', '1116', 'fbar', '8938'],
    reviewStatus: 'draft',
  },
  {
    slug: 'business',
    title: 'Business Owners & Entrepreneurs',
    seoTitle: 'US Tax for American Business Owners Abroad',
    seoDescription:
      'US reporting for Americans who own companies abroad. Foreign entity reporting, GILTI planning and self-employment tax handled by specialists.',
    summary:
      'US reporting for Americans who own or control a company outside the United States.',
    isThisYou: [
      'You own or part-own a company incorporated outside the US',
      'You are self-employed or freelance abroad',
      'Your local accountant handles the local filings but not the US side',
      'You have heard of GILTI or Form 5471 and are not sure whether they apply',
      'You are unsure whether your business structure creates US obligations',
    ],
    overview:
      'Owning a business abroad as a US person triggers some of the most demanding reporting in the US tax code. Ownership of a foreign corporation, partnership or disregarded entity can each carry its own annual information return, separate from your personal filing, and these are due whether or not the business distributed anything to you. The penalties attached to these forms are automatic and are assessed for late filing alone, independent of whether any tax was due.',
    reassurance:
      'Local accountants are rarely expected to know US entity reporting, so gaps here are common and are not a sign that anything was done wrong. We handle the US side and work alongside your existing local adviser rather than replacing them.',
    relatedServices: [
      'foreign-entities',
      'gilti',
      'totalization',
      'expat-tax-returns',
      'tax-planning',
      'equity-compensation',
    ],
    relatedForms: ['5471', '8865', '8858', '8992', 'schedule-c-se'],
    reviewStatus: 'draft',
  },
  {
    slug: 'catch-up',
    title: 'Accidental Americans & Catch-Up Filers',
    seoTitle: 'Behind on US Tax Returns? Catch-Up Filing for Expats',
    seoDescription:
      'Years behind on US tax filing, or only just discovered you are a US taxpayer? Specialist help with streamlined catch-up procedures.',
    summary:
      'For people who are years behind on US filing, or who have only just discovered they were required to file at all.',
    isThisYou: [
      'You have not filed a US return for several years',
      'You were born in the US but left as a child and have never filed',
      'Your bank has contacted you asking for a US tax number',
      'You only recently learned that US citizens must file from abroad',
      'You want to become compliant without making the situation worse',
    ],
    overview:
      'Two groups arrive here. The first knew they should file and fell behind. The second had no idea the obligation existed — people born in the United States who left as infants, or dual citizens who have never lived there. Both are common, and the US operates established procedures specifically for people whose failure to file was not wilful. These procedures exist precisely because the situation is widespread.',
    reassurance:
      'Being behind is far more common than most people realise, and in the great majority of cases it is a correctable administrative problem rather than a criminal one. The right first step is an assessment of your specific facts — not a payment, and not a rushed filing.',
    relatedServices: [
      'streamlined-filing',
      'delinquent-submissions',
      'amended-returns',
      'expat-tax-returns',
      'fbar',
      'irs-representation',
    ],
    relatedForms: ['14653', '14654', 'fbar', '8938', '1040'],
    reviewStatus: 'draft',
  },
  {
    slug: 'relocation',
    title: 'Moving Abroad & Returning to the US',
    seoTitle: 'US Tax When Moving Abroad or Returning Home',
    seoDescription:
      'Dual-status returns, state residency exit and planning for the year you move. US tax guidance for Americans relocating in either direction.',
    summary:
      'Planning and filing for the year you leave the United States, or the year you come back.',
    isThisYou: [
      'You are moving abroad this year or next',
      'You are returning to the US after a period overseas',
      'You need to break residency with a US state such as California or New York',
      'You want to understand what to do before you go, not after',
      'Your move spans two tax years and you are unsure how it is reported',
    ],
    overview:
      'The year of a move is usually the most complex tax year a person will have. Residency can start or end partway through it, which changes how income is reported either side of that date. State residency is a separate question from federal, and some states are considerably harder to leave than others. Decisions made before departure — about timing, assets and accounts — are generally far easier to act on than the same decisions made afterwards.',
    reassurance:
      'The most valuable work in a relocation happens before the move. If you are planning ahead, you are approaching this in the right order.',
    relatedServices: [
      'relocation',
      'state-tax',
      'tax-planning',
      'expat-tax-returns',
      'feie-ftc',
      'equity-compensation',
    ],
    relatedForms: ['1040-nr', '1040', '2350', '2555'],
    reviewStatus: 'draft',
  },
  {
    slug: 'green-card-holders',
    title: 'Green Card Holders Abroad',
    seoTitle: 'US Tax for Green Card Holders Living Abroad',
    seoDescription:
      'Green card holders are taxed as US persons on worldwide income even while living outside the United States. Specialist filing and exit advice.',
    summary:
      'Lawful permanent residents are taxed as US persons on worldwide income, even while living outside the United States.',
    isThisYou: [
      'You hold a US green card but live outside the United States',
      'You assumed your US tax obligations paused when you left',
      'You are considering giving up your green card',
      'You want to keep your residency status and stay tax compliant',
      'You are unsure how your tax position affects your immigration status',
    ],
    overview:
      'A green card makes you a US tax resident for as long as you hold it, regardless of where you actually live. The obligation does not pause when you move abroad, and it does not end simply because you stop using the card. Surrendering it is itself a formal step with tax consequences of its own, and the interaction between immigration status and tax status is a common source of expensive surprises.',
    reassurance:
      'This is one of the least understood areas of US tax, and not knowing is extremely common. What matters is getting an accurate picture of where you stand before making any decision about the card itself.',
    relatedServices: [
      'expat-tax-returns',
      'expatriation',
      'fbar',
      'fatca',
      'streamlined-filing',
      'tax-planning',
    ],
    relatedForms: ['8854', '1040', 'fbar', '8938'],
    reviewStatus: 'draft',
  },
  {
    slug: 'private-client',
    title: 'High-Net-Worth, Trusts & Estates',
    seoTitle: 'Private Client US Tax: Trusts, Gifts & Estates',
    seoDescription:
      'Cross-border US tax for private clients. Foreign trust reporting, gifts and inheritances, and US gift and estate tax, coordinated with your advisers.',
    summary:
      'Cross-border reporting for substantial and structured wealth, coordinated with your existing advisers.',
    isThisYou: [
      'You are a beneficiary, settlor or trustee of a non-US trust',
      'You have received, or expect, a substantial gift or inheritance from abroad',
      'You hold significant assets across more than one jurisdiction',
      'You are planning your estate across US and non-US rules',
      'You work with a wealth manager or solicitor who needs US tax input',
    ],
    overview:
      'Cross-border wealth engages parts of the US code that rarely affect anyone else: foreign trust reporting, gift and inheritance disclosure, and the interaction of US estate tax with the rules of another jurisdiction. These regimes are unforgiving about deadlines and documentation, and the reporting obligations frequently apply even where no tax is ultimately payable.',
    reassurance:
      'This work is handled discreetly and in coordination with the advisers you already use. The objective is a clear, defensible reporting position, not a restructuring of arrangements that are working.',
    relatedServices: [
      'foreign-trusts-gifts',
      'gift-estate-tax',
      'tax-planning',
      'pfic',
      'expatriation',
      'foreign-entities',
    ],
    relatedForms: ['3520', '3520-a', '709', '706', '8621'],
    reviewStatus: 'draft',
  },
]
