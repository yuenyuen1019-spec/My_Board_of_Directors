import { Brain, Users, MessageSquare, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI 智囊團",
    description: "與歷史上的偉大人物對話，獲得他們的專業見解和建議。"
  },
  {
    icon: Users,
    title: "自定義組合",
    description: "自由選擇智囊團成員，創建屬於你的專業顧問團隊。"
  },
  {
    icon: MessageSquare,
    title: "智能對話",
    description: "基於每位成員的專業背景和理念，提供個性化的回答。"
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "企業級安全保護，確保你的對話內容和個人資料安全。"
  }
]

export function Features() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            為什麼選擇我的董事會？
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            我們提供最專業的AI智囊團服務，讓你與歷史上的偉大人物對話
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
