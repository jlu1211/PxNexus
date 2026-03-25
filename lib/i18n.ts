export type Locale = 'en' | 'ja'

export const translations = {
  en: {
    nav: {
      solutions: 'Solutions',
      framework: 'The Px Framework',
      platform: 'Platform',
      about: 'About',
      chatzo: 'ChatZO',
      chatzoCaption: 'Year-end adjustment automation',
      signIn: 'Sign in',
      requestDemo: 'Request Demo',
    },
    hero: {
      eyebrow: 'Consulting × AI × Implementation',
      headline1: 'Redesigning HR',
      headline2: 'from the ground up.',
      sub: 'We deconstruct and redesign HR labor operations — combining consulting expertise and AI to create a new standard for sustainable HR operations.',
      body: 'From people-dependent HR to operations that run on structure, autonomously.',
      cta1: 'See Our Solutions',
      cta2: 'The Px Framework',
      scroll: 'Scroll',
    },
    framework: {
      eyebrow: 'Our Values',
      headline: 'Five principles behind everything we do.',
      sub: 'Deconstruct. Redesign. Implement. Every PxNexus engagement is grounded in these values.',
      footnote: 'Every project is shaped by all five.',
      pillars: [
        {
          letter: 'P',
          label: 'Partner First',
          tagline: 'Every decision starts from client outcomes.',
          description:
            'We orient every proposal, design decision, and implementation choice around what actually moves the needle for our clients — not what is easiest to deliver.',
          features: ['Outcome-driven proposals', 'Long-term partnerships', 'Transparent communication'],
        },
        {
          letter: 'P',
          label: 'Process Intelligence',
          tagline: 'We break down operations and understand them as structures.',
          description:
            'Before redesigning anything, we deconstruct it. We map every workflow, identify every manual dependency, and turn implicit knowledge into explicit, transferable structure.',
          features: ['Structural process analysis', 'People-dependency mapping', 'Redesignable operations'],
          featured: true,
        },
        {
          letter: 'P',
          label: 'People by Design',
          tagline: 'We design systems so people can focus on creating value.',
          description:
            'Every process we redesign has one goal: free people from repetitive admin so they can do the work that actually matters. People are not a resource to manage — they are the reason the system exists.',
          features: ['Human-centered design', 'Value-creation focus', 'Admin elimination'],
        },
        {
          letter: 'P',
          label: 'Proof over Promises',
          tagline: 'We build trust through implementation and results, not promises.',
          description:
            "We don't win business with polished decks. We win it by delivering. Every engagement is measured against outcomes — and if something isn't working, we say so and fix it.",
          features: ['Results-first culture', 'Transparent progress tracking', 'Outcome accountability'],
        },
        {
          letter: 'P',
          label: 'Pioneer New Standards',
          tagline: 'We continuously create new standards for HR operations.',
          description:
            'We do not just fix today\'s problems. We build the operational standards that will define how HR runs tomorrow — sustainable, scalable, and independent of any one person.',
          features: ['Industry standard redefinition', 'Continuous improvement cycles', 'Sustainable operations design'],
        },
      ],
    },
    tech: {
      eyebrow: 'Solutions',
      headline: 'How we rebuild HR operations with AI and consulting.',
      sub: "No black box. From process analysis to implementation — everything is transparent.",
      features: [
        {
          title: 'Operations Audit',
          description:
            'We deconstruct your current HR processes to identify bottlenecks, manual dependencies, and structural inefficiencies — and show you exactly what needs to change.',
        },
        {
          title: 'Process Redesign',
          description:
            'We redesign workflows from the ground up — eliminating manual steps and building operations that run autonomously, regardless of who is on the team.',
        },
        {
          title: 'AI Implementation',
          description:
            'We deploy custom AI tools that handle repetitive HR tasks, freeing your team to focus entirely on value creation rather than administration.',
        },
        {
          title: 'Operations Standards',
          description:
            'We build the documentation and standards that keep HR running consistently — even when people change. Sustainable by design.',
        },
      ],
      stats: [
        { value: '100+', label: 'Projects Delivered' },
        { value: '95%', label: 'Client Satisfaction' },
        { value: '60%', label: 'Workload Reduction' },
      ],
      cta: 'Request a Free Audit',
    },
    trust: {
      eyebrow: 'Why PxNexus',
      quote: "We're HR operations specialists. Not just consultants. Not just tool vendors. We deconstruct, redesign, and see it through to implementation — and we take full ownership of the outcome.",
      attribution: '— The PxNexus Team',
      stats: [
        { value: '100+', label: 'Projects Delivered', sub: 'across industries and company sizes' },
        { value: '95%', label: 'Client Satisfaction', sub: 'post-project survey' },
        { value: '60%', label: 'Workload Reduction', sub: 'average across engagements' },
        { value: '4.9 / 5', label: 'Client Rating', sub: 'based on project reviews' },
      ],
      testimonials: [
        {
          quote:
            "Thanks to PxNexus, our HR processes no longer depend on any one person. Operations run smoothly even when team members change — that was the real transformation.",
          author: 'Mia Hartmann',
          role: 'HR Director, Brightloop Inc.',
        },
        {
          quote:
            "What sets PxNexus apart is the end-to-end approach. They don't just advise, and they don't just hand you a tool. They deconstruct, redesign, and implement alongside you.",
          author: 'David Sato',
          role: 'COO, Meridian Corp.',
        },
      ],
    },
    form: {
      eyebrow: "Let's Talk",
      headline: "Tell us about your\nHR operations.",
      sub: "No hard sell. Tell us about your current HR setup and we'll help you identify exactly what needs to change.",
      steps: [
        'A 30-minute free discovery call with a specialist',
        'A solution proposal tailored to your challenges',
        'A free quick audit of your key HR processes',
      ],
      stepsLabel: 'What happens next',
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Work Email',
        company: 'Company',
        size: 'Team Size',
        sizeOptions: ['1–50', '51–250', '251–1,000', '1,000+'],
        sizeDefault: 'Select size',
        message: 'Anything else?',
        messagePlaceholder: "What's your biggest HR operations challenge right now?",
        intent: "What are you hoping to solve?",
        intents: [
          'Systematize people-dependent processes',
          'Automate HR tasks with AI',
          'Redesign our entire HR operations',
          'Improve a specific process',
          'Just exploring for now',
        ],
      },
      submit: 'Send Message',
      submitting: 'Sending...',
      disclaimer: 'No spam. Unsubscribe anytime.',
      successTitle: "We'll be in touch soon.",
      successBody:
        'Thanks for reaching out. A specialist on our team will reply within one business day.',
    },
    footer: {
      tagline: 'Creating a new standard for sustainable HR operations.',
      categories: {
        Platform: ['Operations Audit', 'AI Implementation', 'Operations Design', 'Standardization'],
        Company: ['About Us', 'Mission & Vision', 'Careers', 'Press'],
        Resources: ['Blog', 'Case Studies', 'HR Operations Guide', 'Docs'],
        Legal: ['Privacy', 'Terms', 'Cookies'],
      },
      social: ['LinkedIn', 'Twitter', 'Email'],
      copyright: '© 2026 PxNexus. All rights reserved.',
      missionLine: '"Redesigning HR, from the ground up."',
    },
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
      requestDemo: '無料デモを申込む',
    },
    hero: {
      eyebrow: 'コンサルティング × AI × 実装',
      headline1: '人事労務を、',
      headline2: '再設計する。',
      sub: '人事労務業務を分解・再設計し、コンサルティングとAIの力で、持続可能な人事オペレーションの新しい標準を創る。',
      body: '人に依存した人事労務から、構造で自律的に回るオペレーションへ。',
      cta1: 'ソリューションを見る',
      cta2: 'Pxフレームワークとは',
      scroll: 'スクロール',
    },
    framework: {
      eyebrow: 'Our Values',
      headline: '私たちが大切にする5つの価値観。',
      sub: '分解し、再設計し、実装する。PxNexusのすべての行動原理がここにあります。',
      footnote: 'すべてのプロジェクトに、この価値観を込めて。',
      pillars: [
        {
          letter: 'P',
          label: 'Partner First',
          tagline: 'すべての意思決定を、顧客成果から始める。',
          description:
            'どんな提案も、設計判断も、実装の選択も、「クライアントにとって何が本当に価値か」を出発点にします。提供のしやすさではなく、成果を基準に動く。',
          features: ['顧客成果ドリブンな提案', '長期パートナーシップ', '透明なコミュニケーション'],
        },
        {
          letter: 'P',
          label: 'Process Intelligence',
          tagline: '業務を分解し、構造として捉える。',
          description:
            '再設計の前に、まず分解する。すべての業務フローをマッピングし、属人的な依存関係を特定し、暗黙知を明示的な構造に変換します。',
          features: ['プロセスの構造的分析', '属人化リスクの可視化', '再設計可能な業務設計'],
          featured: true,
        },
        {
          letter: 'P',
          label: 'People by Design',
          tagline: '人が価値創出に集中できる仕組みを設計する。',
          description:
            '私たちが再設計するすべてのプロセスには、ひとつの目標があります。反復的な管理業務から人を解放し、本当に意味のある仕事に集中できるようにすること。人はリソースではなく、仕組みが存在する理由そのものです。',
          features: ['人間中心の設計', '価値創出への集中', '管理業務の排除'],
        },
        {
          letter: 'P',
          label: 'Proof over Promises',
          tagline: '約束ではなく、実装と成果で信頼を築く。',
          description:
            '私たちは磨き上げたプレゼンで受注しません。実装して、届けることで信頼を得ます。すべてのプロジェクトは成果で評価され、うまくいかないことがあれば正直に伝えて修正します。',
          features: ['成果ファーストの文化', '透明な進捗管理', 'アウトカムへのコミット'],
        },
        {
          letter: 'P',
          label: 'Pioneer New Standards',
          tagline: '人事労務オペレーションの新しい標準を創り続ける。',
          description:
            '今日の問題を解決するだけでなく、明日の人事労務がどうあるべきかを定義するオペレーション標準を築きます。持続可能で、スケーラブルで、属人化しない。',
          features: ['業界標準の再定義', '継続的改善サイクル', '持続可能なオペレーション設計'],
        },
      ],
    },
    tech: {
      eyebrow: 'ソリューション',
      headline: 'AIとコンサルで、人事労務を再構築する。',
      sub: 'ブラックボックスなし。プロセスの分析から実装まで、すべてを透明に進めます。',
      features: [
        {
          title: '業務プロセス診断',
          description:
            '現状の人事労務プロセスを分解し、ボトルネック・属人化・構造的非効率を特定します。何を変えるべきか、明確に示します。',
        },
        {
          title: 'プロセス再設計',
          description:
            'ゼロから業務フローを再設計。手動作業を削減し、担当者が変わっても自律的に回るオペレーションを構築します。',
        },
        {
          title: 'AI実装・自動化',
          description:
            '反復的な人事タスクを処理するカスタムAIツールを導入。チームが管理業務ではなく、価値創出に集中できる環境を整えます。',
        },
        {
          title: 'オペレーション標準化',
          description:
            '人が変わっても業務が継続できる、ドキュメントと標準を構築します。持続可能な仕組みを資産として残します。',
        },
      ],
      stats: [
        { value: '100+', label: 'プロジェクト実績' },
        { value: '95%', label: 'クライアント満足度' },
        { value: '60%', label: '業務工数削減' },
      ],
      cta: '無料診断を申し込む',
    },
    trust: {
      eyebrow: 'なぜ選ばれるのか',
      quote: '私たちは人事労務オペレーションの専門家です。コンサルティングだけでもなく、ツール導入だけでもない。分解して、再設計して、実装まで責任を持って取り組みます。',
      attribution: '— PxNexusチーム一同',
      stats: [
        { value: '100+', label: 'プロジェクト実績', sub: '様々な業種・規模で' },
        { value: '95%', label: 'クライアント満足度', sub: 'プロジェクト後アンケート' },
        { value: '60%', label: '業務工数削減', sub: 'プロジェクト平均' },
        { value: '4.9 / 5', label: 'クライアント評価', sub: 'レビューに基づく' },
      ],
      testimonials: [
        {
          quote:
            'PxNexusのおかげで、特定の担当者に依存していた人事労務プロセスが、誰でも回せる仕組みになりました。担当者が変わっても業務が止まらない。それが本当の変化でした。',
          author: '田中 美咲',
          role: '人事部長・Brightloop株式会社',
        },
        {
          quote:
            '「コンサルだけ」「ツールだけ」ではなく、分解→再設計→実装まで一貫してやってもらえる。そのEnd-to-Endのアプローチがほかにはないと思います。',
          author: '佐藤 大輔',
          role: '管理部長・メリディアン株式会社',
        },
      ],
    },
    form: {
      eyebrow: 'まず、話しましょう',
      headline: '人事労務の\n現状を聞かせてください。',
      sub: '強引なセールスはしません。御社の人事労務の現状を教えてください。一緒に課題を整理します。',
      steps: [
        '専門担当者との30分の無料ヒアリングコール',
        '課題に合わせたソリューション提案',
        '主要プロセスの無料簡易診断',
      ],
      stepsLabel: 'ご連絡後の流れ',
      fields: {
        firstName: '名',
        lastName: '姓',
        email: '会社メールアドレス',
        company: '会社名',
        size: '従業員規模',
        sizeOptions: ['1〜50名', '51〜250名', '251〜1,000名', '1,000名以上'],
        sizeDefault: '選択してください',
        message: 'その他ご連絡事項',
        messagePlaceholder: '現在の人事労務の課題があれば教えてください。',
        intent: "解決したい課題を教えてください",
        intents: [
          '属人化した業務を仕組み化したい',
          '人事労務のAI化・自動化を進めたい',
          'オペレーション全体を再設計したい',
          '特定プロセスの効率化',
          'まずは情報収集',
        ],
      },
      submit: '送信する',
      submitting: '送信中...',
      disclaimer: 'スパムはしません。いつでも登録解除できます。',
      successTitle: '近日中にご連絡します。',
      successBody: 'お問い合わせありがとうございます。担当者が1営業日以内にご返信します。',
    },
    footer: {
      tagline: '持続可能な人事オペレーションの標準を、共に創る。',
      categories: {
        Platform: ['業務プロセス診断', 'AI実装', 'オペレーション設計', '標準化支援'],
        Company: ['会社概要', 'ミッション・ビジョン', '採用情報', 'プレス'],
        Resources: ['ブログ', '事例紹介', '人事労務ガイド', 'ドキュメント'],
        Legal: ['プライバシーポリシー', '利用規約', 'クッキー'],
      },
      social: ['LinkedIn', 'Twitter', 'メール'],
      copyright: '© 2026 PxNexus. All rights reserved.',
      missionLine: '「人事労務を、再設計する。」',
    },
  },
} as const

export type TranslationKey = typeof translations
