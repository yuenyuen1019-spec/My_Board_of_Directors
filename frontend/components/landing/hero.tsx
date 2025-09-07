import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          我的董事會
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          選擇你的智囊團成員，獲得專業的AI建議
        </p>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          與史蒂夫·賈伯斯、華倫·巴菲特、愛因斯坦等偉大人物對話，
          獲得他們專業領域的深度見解和建議。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/auth/register">開始使用</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link href="/members">查看智囊團</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
