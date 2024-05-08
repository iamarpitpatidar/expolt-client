import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import Link from 'next/link'

async function NewsCard() {
  const response = await fetch(`https://techcrunch.vercel.app/articles`).then(
    (res) => res.json(),
  )

  const { articles } = response
  if (!articles) return null
  const article = articles[0]

  return (
    <Card
      className="relative overlay"
      style={{ background: `url(${article.image})`, backgroundSize: 'cover' }}
    >
      <CardContent className="p-8 dashboard-hero">
        <div className="absolute bottom-0 z-20">
          <Link href={article.link} target="_blank">
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
