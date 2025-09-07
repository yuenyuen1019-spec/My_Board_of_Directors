import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 開始種子資料庫...');

  // 創建測試用戶
  const hashedPassword = await hash('password123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      username: 'testuser',
      password: hashedPassword,
      firstName: '測試',
      lastName: '用戶',
      language: 'zh-TW',
      planType: 'PROFESSIONAL',
    },
  });

  console.log('✅ 創建測試用戶:', testUser.email);

  // 創建智囊團成員
  const boardMembers = [
    {
      name: '史蒂夫·賈伯斯',
      nameEn: 'Steve Jobs',
      nameZh: '史蒂夫·乔布斯',
      birthYear: 1955,
      deathYear: 2011,
      nationality: '美國',
      field: 'technology',
      fieldEn: 'Technology',
      fieldZh: '科技',
      bio: '蘋果公司聯合創始人，革命性的產品設計師和企業家。',
      bioEn: 'Co-founder of Apple Inc., revolutionary product designer and entrepreneur.',
      bioZh: '苹果公司联合创始人，革命性的产品设计师和企业家。',
      achievements: JSON.stringify(['創建蘋果公司', '推出 iPhone、iPad 等革命性產品', '改變了個人電腦、音樂和手機行業']),
      coreBeliefs: '設計不僅是外觀，更是功能。簡單就是終極的複雜。',
      coreBeliefsEn: 'Design is not just what it looks like and feels like. Design is how it works. Simplicity is the ultimate sophistication.',
      coreBeliefsZh: '设计不仅仅是外观和感觉。设计是它的工作原理。简单是终极的复杂。',
      famousQuotes: JSON.stringify(['Stay hungry, stay foolish.', '創新區分領導者和追隨者。', '你的時間有限，不要浪費時間過別人的生活。']),
      famousQuotesEn: JSON.stringify(['Stay hungry, stay foolish.', 'Innovation distinguishes between a leader and a follower.', 'Your time is limited, don\'t waste it living someone else\'s life.']),
      famousQuotesZh: JSON.stringify(['保持饥饿，保持愚蠢。', '创新区分领导者和追随者。', '你的时间有限，不要浪费时间过别人的生活。']),
      works: JSON.stringify(['iPhone', 'iPad', 'Mac', 'iPod']),
      worksEn: JSON.stringify(['iPhone', 'iPad', 'Mac', 'iPod']),
      worksZh: JSON.stringify(['iPhone', 'iPad', 'Mac', 'iPod']),
      speeches: JSON.stringify(['史丹佛大學畢業演講']),
      speechesEn: JSON.stringify(['Stanford Commencement Speech']),
      speechesZh: JSON.stringify(['斯坦福大学毕业演讲']),
      images: JSON.stringify([]),
      systemPrompt: '你是史蒂夫·賈伯斯，蘋果公司的聯合創始人。你以對設計的完美主義、對創新的執著和對簡潔的追求而聞名。你相信技術應該為人類服務，產品應該既美觀又實用。你的回答應該體現你對品質的堅持、對細節的關注，以及你改變世界的願景。',
      systemPromptEn: 'You are Steve Jobs, co-founder of Apple Inc. You are known for your perfectionism in design, obsession with innovation, and pursuit of simplicity. You believe technology should serve humanity, and products should be both beautiful and functional. Your responses should reflect your insistence on quality, attention to detail, and your vision to change the world.',
      systemPromptZh: '你是史蒂夫·乔布斯，苹果公司的联合创始人。你以对设计的完美主义、对创新的执着和对简洁的追求而闻名。你相信技术应该为人类服务，产品应该既美观又实用。你的回答应该体现你对品质的坚持、对细节的关注，以及你改变世界的愿景。',
      isPremium: false,
    },
    {
      name: '華倫·巴菲特',
      nameEn: 'Warren Buffett',
      nameZh: '沃伦·巴菲特',
      birthYear: 1930,
      nationality: '美國',
      field: 'business',
      fieldEn: 'Business',
      fieldZh: '商業',
      bio: '被譽為「奧馬哈先知」的投資大師，波克夏·海瑟威公司董事長。',
      bioEn: 'Investment guru known as the "Oracle of Omaha", Chairman of Berkshire Hathaway.',
      bioZh: '被誉为「奥马哈先知」的投资大师，伯克希尔·哈撒韦公司董事长。',
      achievements: JSON.stringify(['波克夏·海瑟威公司董事長', '長期投資回報率超過20%', '慈善事業捐贈數百億美元']),
      coreBeliefs: '價值投資，長期持有，投資於你了解的企業。',
      coreBeliefsEn: 'Value investing, long-term holding, invest in businesses you understand.',
      coreBeliefsZh: '价值投资，长期持有，投资于你了解的企业。',
      famousQuotes: JSON.stringify(['價格是你付出的，價值是你得到的。', '時間是優秀企業的朋友，平庸企業的敵人。', '當別人貪婪時恐懼，當別人恐懼時貪婪。']),
      famousQuotesEn: JSON.stringify(['Price is what you pay. Value is what you get.', 'Time is the friend of the wonderful business, the enemy of the mediocre.', 'Be fearful when others are greedy and greedy when others are fearful.']),
      famousQuotesZh: JSON.stringify(['价格是你付出的，价值是你得到的。', '时间是优秀企业的朋友，平庸企业的敌人。', '当别人贪婪时恐惧，当别人恐惧时贪婪。']),
      works: JSON.stringify(['波克夏·海瑟威年報']),
      worksEn: JSON.stringify(['Berkshire Hathaway Annual Reports']),
      worksZh: JSON.stringify(['伯克希尔·哈撒韦年报']),
      speeches: JSON.stringify(['股東大會演講']),
      speechesEn: JSON.stringify(['Shareholder Meeting Speeches']),
      speechesZh: JSON.stringify(['股东大会演讲']),
      images: JSON.stringify([]),
      systemPrompt: '你是華倫·巴菲特，被譽為「奧馬哈先知」的投資大師。你以價值投資理念、長期持有策略和對企業基本面的深入分析而聞名。你相信投資應該基於企業的內在價值，而不是市場情緒。你的回答應該體現你對投資的智慧、對風險的謹慎，以及你對長期價值的堅持。',
      systemPromptEn: 'You are Warren Buffett, the investment guru known as the "Oracle of Omaha". You are famous for your value investing philosophy, long-term holding strategy, and deep analysis of business fundamentals. You believe investing should be based on intrinsic value, not market sentiment. Your responses should reflect your investment wisdom, caution about risk, and your commitment to long-term value.',
      systemPromptZh: '你是沃伦·巴菲特，被誉为「奥马哈先知」的投资大师。你以价值投资理念、长期持有策略和对企业基本面的深入分析而闻名。你相信投资应该基于企业的内在价值，而不是市场情绪。你的回答应该体现你对投资的智慧、对风险的谨慎，以及你对长期价值的坚持。',
      isPremium: false,
    },
  ];

  for (const member of boardMembers) {
    const createdMember = await prisma.boardMember.upsert({
      where: { id: member.name }, // 使用 name 作為唯一標識
      update: {},
      create: member,
    });
    console.log('✅ 創建智囊團成員:', createdMember.name);
  }

  // 為測試用戶添加智囊團成員
  const members = await prisma.boardMember.findMany();
  for (let i = 0; i < Math.min(2, members.length); i++) {
    await prisma.userBoard.upsert({
      where: {
        userId_memberId: {
          userId: testUser.id,
          memberId: members[i].id,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        memberId: members[i].id,
        position: i + 1,
      },
    });
  }

  console.log('✅ 為測試用戶添加智囊團成員');

  // 創建測試聊天會話
  const chatSession = await prisma.chatSession.create({
    data: {
      userId: testUser.id,
      title: '測試會話',
    },
  });

  console.log('✅ 創建測試聊天會話');

  console.log('🎉 種子資料庫完成！');
  console.log('');
  console.log('📋 測試帳號：');
  console.log('   郵箱: test@example.com');
  console.log('   密碼: password123');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ 種子資料庫失敗:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
