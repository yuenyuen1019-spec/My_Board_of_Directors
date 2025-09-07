import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "免費版",
    price: "免費",
    description: "適合個人用戶試用",
    features: [
      "3次AI問答/天",
      "3個智囊團成員",
      "5個聊天會話",
      "基礎功能"
    ],
    buttonText: "開始使用",
    popular: false
  },
  {
    name: "基礎版",
    price: "$9.99",
    period: "/月",
    description: "適合個人用戶日常使用",
    features: [
      "10次AI問答/天",
      "5個智囊團成員",
      "20個聊天會話",
      "聊天歷史記錄",
      "優先支援"
    ],
    buttonText: "選擇基礎版",
    popular: false
  },
  {
    name: "專業版",
    price: "$19.99",
    period: "/月",
    description: "適合專業人士和小團隊",
    features: [
      "50次AI問答/天",
      "10個智囊團成員",
      "100個聊天會話",
      "付費智囊團成員",
      "數據導出",
      "優先支援"
    ],
    buttonText: "選擇專業版",
    popular: true
  },
  {
    name: "企業版",
    price: "$49.99",
    period: "/月",
    description: "適合大型企業和組織",
    features: [
      "無限AI問答",
      "無限智囊團成員",
      "無限聊天會話",
      "API訪問",
      "自定義整合",
      "專屬客戶經理"
    ],
    buttonText: "聯繫銷售",
    popular: false
  }
]

export function Pricing() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            選擇適合你的計劃
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            從免費試用到企業級解決方案，我們為每個用戶提供最適合的選擇
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-lg border-2 ${
                plan.popular 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-background'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    最受歡迎
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
