module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/i18n.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        nav: {
            solutions: 'Solutions',
            framework: 'The Px Framework',
            platform: 'Platform',
            about: 'About',
            chatzo: 'ChatZO',
            chatzoCaption: 'Year-end adjustment automation',
            signIn: 'Sign in',
            requestDemo: 'Request Demo'
        },
        hero: {
            eyebrow: 'Hiring that actually feels right',
            headline1: 'Find people who',
            headline2: 'fit, stay, and grow.',
            sub: 'PxNexus helps HR teams hire based on skills, values, and team culture — not just résumés.',
            body: 'We built PxNexus because we believed hiring could be more thoughtful. More human. Less guesswork.',
            cta1: 'See the Platform',
            cta2: 'How It Works',
            scroll: 'Scroll'
        },
        framework: {
            eyebrow: 'The Framework',
            headline: 'Three things we genuinely care about.',
            sub: "In PxNexus, the P isn't just a letter. It's how we think about every person in every hire.",
            footnote: 'Every placement is shaped by all three.',
            pillars: [
                {
                    letter: 'P',
                    label: 'People',
                    tagline: 'Skills matter. So does the whole person.',
                    description: "We look beyond credentials. Our matching surfaces candidates who don't just fill a role — they bring something to it. Capabilities, character, and how they want to grow.",
                    features: [
                        'Skills-first profiles',
                        'Behavioral fit signals',
                        'Long-term trajectory'
                    ]
                },
                {
                    letter: 'P',
                    label: 'Philosophy',
                    tagline: "Culture fit isn't a buzzword here.",
                    description: "We actually measure it. Our culture-matching engine maps how a candidate's values and working style align with your team — so you're not just guessing.",
                    features: [
                        'Values-based matching',
                        'Team culture profiling',
                        'Compatibility scoring'
                    ],
                    featured: true
                },
                {
                    letter: 'P',
                    label: 'Passion',
                    tagline: 'Engaged people do better work. Fact.',
                    description: 'We help you look past the interview performance to find what someone is genuinely excited about — because that energy is exactly what great teams run on.',
                    features: [
                        'Engagement signals',
                        'Growth pathway mapping',
                        'Retention indicators'
                    ]
                }
            ]
        },
        tech: {
            eyebrow: 'The Platform',
            headline: "Here's how the matching actually works.",
            sub: "There's no black box. We'll show you exactly what signals we use, how we weight them, and why.",
            features: [
                {
                    title: 'Smart Match Engine',
                    description: 'We look at 140+ signals across skills, values, working style, and growth potential — and show you why each match scores the way it does.'
                },
                {
                    title: 'Live Culture Profiles',
                    description: 'Your team culture map updates continuously based on real behavioral signals, not annual surveys. It reflects who your team actually is.'
                },
                {
                    title: 'Retention Risk Alerts',
                    description: 'Spot potential flight risk 60–90 days early. Not to surveil people — but to give managers a chance to have a real conversation before it\'s too late.'
                },
                {
                    title: 'Works with your tools',
                    description: 'Connects with Workday, BambooHR, SAP SuccessFactors, and 30+ HRIS platforms. Your team keeps working the way they already do.'
                }
            ],
            stats: [
                {
                    value: '140+',
                    label: 'Match Signals'
                },
                {
                    value: '92%',
                    label: 'Placement Accuracy'
                },
                {
                    value: '2.1×',
                    label: 'Faster to Hire'
                }
            ],
            cta: 'Request a Demo'
        },
        trust: {
            eyebrow: 'Why It Works',
            quote: "We're a small team that takes this seriously. When a hire works out — when someone finds a place they belong — that's what we built this for.",
            attribution: '— The PxNexus Team',
            stats: [
                {
                    value: '1,200+',
                    label: 'Organizations',
                    sub: 'across 18 industries'
                },
                {
                    value: '94%',
                    label: 'Retention at 1 Year',
                    sub: 'vs. 67% industry avg.'
                },
                {
                    value: '48K+',
                    label: 'Placements Made',
                    sub: 'since 2019'
                },
                {
                    value: '4.9 / 5',
                    label: 'Client Rating',
                    sub: 'based on 3,400 reviews'
                }
            ],
            testimonials: [
                {
                    quote: "PxNexus changed how we think about hiring. We stopped looking for the perfect CV and started looking for the right person. Big difference.",
                    author: 'Mia Hartmann',
                    role: 'Chief People Officer, Brightloop'
                },
                {
                    quote: "The culture-fit tool surfaced a candidate we almost skipped. That person is now our highest-performing team lead, 18 months in.",
                    author: 'David Sato',
                    role: 'VP of Talent, Meridian Manufacturing'
                }
            ]
        },
        form: {
            eyebrow: 'Get in Touch',
            headline: "Let's have\na conversation.",
            sub: "No hard sell, no 47-email sequence. Just a friendly call to see if we're a good fit for what you're trying to do.",
            steps: [
                'A 30-minute discovery call with a real human',
                'A platform walkthrough tailored to your goals',
                'A free culture audit of your current team'
            ],
            stepsLabel: 'What happens next',
            fields: {
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'Work Email',
                company: 'Company',
                size: 'Team Size',
                sizeOptions: [
                    '1–50',
                    '51–250',
                    '251–1,000',
                    '1,000+'
                ],
                sizeDefault: 'Select size',
                message: 'Anything else?',
                messagePlaceholder: "What's your biggest hiring challenge right now?",
                intent: "What are you hoping to solve?",
                intents: [
                    'Find better-fit candidates',
                    'Reduce early turnover',
                    'Improve culture alignment',
                    'Replace our current ATS',
                    'Just curious'
                ]
            },
            submit: 'Send Message',
            submitting: 'Sending...',
            disclaimer: 'No spam. Unsubscribe anytime.',
            successTitle: "We'll be in touch soon.",
            successBody: 'Thanks for reaching out. A real person on our team will reply within one business day.'
        },
        footer: {
            tagline: 'Built for the people doing the hiring — and the people being hired.',
            categories: {
                Platform: [
                    'Talent Matching',
                    'Culture Profiling',
                    'Analytics',
                    'Integrations'
                ],
                Company: [
                    'About Us',
                    'Our Story',
                    'Careers',
                    'Press'
                ],
                Resources: [
                    'Blog',
                    'Case Studies',
                    'HR Guides',
                    'Docs'
                ],
                Legal: [
                    'Privacy',
                    'Terms',
                    'Cookies'
                ]
            },
            social: [
                'LinkedIn',
                'Twitter',
                'Email'
            ],
            copyright: '© 2026 PxNexus. All rights reserved.',
            missionLine: '"Find people who fit, stay, and grow."'
        }
    },
    ja: {
        nav: {
            solutions: 'ソリューション',
            framework: 'Pxフレームワーク',
            platform: 'プラットフォーム',
            about: '私たちについて',
            chatzo: 'ChatZO',
            chatzoCaption: '年末調整の自動化',
            signIn: 'ログイン',
            requestDemo: '無料デモを申込む'
        },
        hero: {
            eyebrow: '採用を、もっと人間らしく',
            headline1: 'フィットする人材と、',
            headline2: 'ちゃんとつながろう。',
            sub: 'PxNexusは、スキルだけでなく価値観やチームカルチャーを基に採用マッチングを実現するプラットフォームです。',
            body: '採用は、単なる穴埋めではありません。私たちは、もっと丁寧で、人間らしい採用ができると信じています。',
            cta1: 'プラットフォームを見る',
            cta2: '仕組みを知る',
            scroll: 'スクロール'
        },
        framework: {
            eyebrow: 'フレームワーク',
            headline: '私たちが大切にする3つのこと。',
            sub: 'PxNexusの「P」はひとつの言葉ではありません。すべての採用に込めた、私たちの考え方です。',
            footnote: 'すべての採用は、この3つの視点から考えます。',
            pillars: [
                {
                    letter: 'P',
                    label: 'People（人）',
                    tagline: 'スキルも大事。でも、人全体を見る。',
                    description: '経歴書だけで判断しません。能力・人柄・成長意欲を総合的に評価し、単に役割を埋めるだけでなく、チームに貢献できる人材を見つけます。',
                    features: [
                        'スキル重視のプロフィール',
                        '行動特性の分析',
                        '長期的な成長予測'
                    ]
                },
                {
                    letter: 'P',
                    label: 'Philosophy（理念）',
                    tagline: 'カルチャーフィットは、本当に重要です。',
                    description: '価値観やワークスタイルが、チームと実際にどれだけ合っているかを測定します。「なんとなく合いそう」ではなく、データで示します。',
                    features: [
                        '価値観ベースのマッチング',
                        'チームカルチャーのプロファイリング',
                        '相性スコアの算出'
                    ],
                    featured: true
                },
                {
                    letter: 'P',
                    label: 'Passion（情熱）',
                    tagline: '情熱のある人は、より良い仕事をします。',
                    description: '面接での演技ではなく、本当に何に夢中になれるかを見つけます。そのエネルギーこそが、良いチームを動かす源泉だからです。',
                    features: [
                        'エンゲージメント指標',
                        'キャリアパスのマッピング',
                        '定着率シグナル'
                    ]
                }
            ]
        },
        tech: {
            eyebrow: 'プラットフォーム',
            headline: 'マッチングの仕組みを、正直に説明します。',
            sub: 'ブラックボックスはありません。どのシグナルをどう重み付けしているか、すべて開示しています。',
            features: [
                {
                    title: 'スマートマッチエンジン',
                    description: 'スキル・価値観・働き方・成長性など140以上のシグナルを分析し、各マッチのスコアの理由も明確に示します。'
                },
                {
                    title: 'リアルタイムカルチャープロファイル',
                    description: '年1回のアンケートではなく、日常の行動データからチームのカルチャーマップをリアルタイムで更新します。'
                },
                {
                    title: '離職リスクアラート',
                    description: '離職の可能性を60〜90日前に検知します。監視ではなく、マネージャーが適切なタイミングで会話できるようにするためです。'
                },
                {
                    title: '既存ツールと連携',
                    description: 'Workday・BambooHR・SAP SuccessFactorsなど30以上のHRISに対応。今の業務フローを変える必要はありません。'
                }
            ],
            stats: [
                {
                    value: '140+',
                    label: 'マッチングシグナル'
                },
                {
                    value: '92%',
                    label: 'マッチング精度'
                },
                {
                    value: '2.1×',
                    label: '採用スピード向上'
                }
            ],
            cta: 'デモを申し込む'
        },
        trust: {
            eyebrow: 'なぜ機能するのか',
            quote: '私たちは小さなチームですが、この仕事を真剣に考えています。採用がうまくいくとき——誰かが「ここだ」と思える場所に出会うとき——それが私たちの原動力です。',
            attribution: '— PxNexusチーム一同',
            stats: [
                {
                    value: '1,200+',
                    label: '導入企業数',
                    sub: '18業界にわたる'
                },
                {
                    value: '94%',
                    label: '入社1年後の定着率',
                    sub: '業界平均67%比'
                },
                {
                    value: '48,000+',
                    label: '採用成功数',
                    sub: '2019年の創業以来'
                },
                {
                    value: '4.9 / 5',
                    label: 'クライアント評価',
                    sub: '3,400件のレビュー'
                }
            ],
            testimonials: [
                {
                    quote: 'PxNexusを使い始めてから、採用の考え方が変わりました。「完璧な経歴」より「この人と働きたいか」を大切にするようになったんです。',
                    author: '田中 美咲',
                    role: '最高人事責任者・Brightloop株式会社'
                },
                {
                    quote: 'カルチャーフィット機能で、本来ならスキップしていた候補者が目に留まりました。その方は今、18ヶ月経った今もトップパフォーマーです。',
                    author: '佐藤 大輔',
                    role: '採用担当VP・メリディアン製造'
                }
            ]
        },
        form: {
            eyebrow: 'お問い合わせ',
            headline: 'まず、話してみませんか？',
            sub: '強引なセールスはしません。あなたの状況を聞かせてください。私たちがお役に立てるか、一緒に考えます。',
            steps: [
                '担当者との30分のヒアリングコール',
                'あなたの目標に合わせたプラットフォームのご案内',
                '現在のチームの無料カルチャー診断'
            ],
            stepsLabel: 'ご連絡後の流れ',
            fields: {
                firstName: '名',
                lastName: '姓',
                email: '会社メールアドレス',
                company: '会社名',
                size: '従業員規模',
                sizeOptions: [
                    '1〜50名',
                    '51〜250名',
                    '251〜1,000名',
                    '1,000名以上'
                ],
                sizeDefault: '選択してください',
                message: 'その他ご連絡事項',
                messagePlaceholder: '現在の採用課題があれば、ぜひ教えてください。',
                intent: '解決したいことを教えてください',
                intents: [
                    'より適した候補者を見つけたい',
                    '早期離職を減らしたい',
                    'カルチャーフィットを改善したい',
                    '現在のATSを切り替えたい',
                    'まずは情報収集'
                ]
            },
            submit: '送信する',
            submitting: '送信中...',
            disclaimer: 'スパムはしません。いつでも登録解除できます。',
            successTitle: '近日中にご連絡します。',
            successBody: 'お問い合わせありがとうございます。チームのメンバーが1営業日以内にご返信します。'
        },
        footer: {
            tagline: '採用する側にも、される側にも、誠実に。',
            categories: {
                Platform: [
                    '人材マッチング',
                    'カルチャー診断',
                    'アナリティクス',
                    '連携ツール'
                ],
                Company: [
                    '会社情報',
                    '私たちのストーリー',
                    '採用情報',
                    'プレス'
                ],
                Resources: [
                    'ブログ',
                    '事例紹介',
                    'HRガイド',
                    'ドキュメント'
                ],
                Legal: [
                    'プライバシーポリシー',
                    '利用規約',
                    'クッキー'
                ]
            },
            social: [
                'LinkedIn',
                'Twitter',
                'メール'
            ],
            copyright: '© 2026 PxNexus. All rights reserved.',
            missionLine: '「フィットする人材と、ちゃんとつながろう。」'
        }
    }
};
}),
"[project]/lib/i18n-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useI18n",
    ()=>useI18n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    locale: 'ja',
    t: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"].ja,
    setLocale: ()=>{}
});
function I18nProvider({ children }) {
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('ja');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            locale,
            t: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][locale],
            setLocale
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/i18n-context.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function useI18n() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
}
}),
"[project]/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n-context.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["I18nProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0o9_5tt._.js.map