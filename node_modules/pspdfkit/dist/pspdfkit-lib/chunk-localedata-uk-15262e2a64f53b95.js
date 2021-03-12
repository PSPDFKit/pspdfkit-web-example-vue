/*!
 * PSPDFKit for Web 2021.2.0 (https://pspdfkit.com/web)
 * 
 * Copyright (c) 2016-2019 PSPDFKit GmbH. All rights reserved.
 * 
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 * 
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
(window.__PSPDFKitChunk=window.__PSPDFKitChunk||[]).push([[56],{948:function(e,a){Intl.PluralRules&&"function"==typeof Intl.PluralRules.__addLocaleData&&Intl.PluralRules.__addLocaleData({data:{uk:{categories:{cardinal:["one","few","many","other"],ordinal:["few","other"]},fn:function(e,a){var l=String(e).split("."),n=l[0],t=!l[1],i=Number(l[0])==e,o=i&&l[0].slice(-1),u=i&&l[0].slice(-2),r=n.slice(-1),c=n.slice(-2);return a?3==o&&13!=u?"few":"other":t&&1==r&&11!=c?"one":t&&r>=2&&r<=4&&(c<12||c>14)?"few":t&&0==r||t&&r>=5&&r<=9||t&&c>=11&&c<=14?"many":"other"}}},availableLocales:["uk"]})}}]);