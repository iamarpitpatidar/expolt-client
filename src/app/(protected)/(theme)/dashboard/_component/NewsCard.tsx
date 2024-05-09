import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import Link from 'next/link'
import { articles, lastUpdate } from 'src/database'

async function NewsCard() {
  const lastUpdateTime = lastUpdate.findOne({ name: 'articles' })
  if (
    !articles.chain().data().length ||
    !lastUpdateTime ||
    lastUpdateTime > Date.now() - 1000 * 60 * 60
  ) {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=tech&lang=en&country=in&max=10&apikey=${process.env.NEWS_API_KEY}`,
    ).then((res) => res.json())

    const { articles: data } = response
    if (!data) return null
    articles.insert(data)
    if (lastUpdateTime) lastUpdate.remove(lastUpdateTime)
    lastUpdate.insert({ name: 'articles', lastUpdate: Date.now() })
  }
  const article = articles.chain().simplesort('$loki', true).data()[0]

  return (
    <Card
      className="relative overlay"
      style={{ background: `url(${article.image})`, backgroundSize: 'cover' }}
    >
      <CardContent className="p-8 dashboard-hero">
        <div className="absolute bottom-0 z-20">
          <Link href={article.url} target="_blank">
            <Badge className="my-4" variant="secondary">
              Explore
            </Badge>
          </Link>
          <CardTitle className="text-white text-2xl my-4">
            {article.title}
          </CardTitle>
          <CardDescription className="text-white text-sm mb-8">
            {article.description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export { NewsCard }
