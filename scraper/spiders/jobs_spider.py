import scrapy
from scraper.items import JobItem
from scrapy.loader import ItemLoader
from itemloaders.processors import Join


class JobsSpider(scrapy.Spider):
    name = "jobs_spider"
    allowed_domains = ["candidat.francetravail.fr"]

    def __init__(self, start_url=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.start_urls = [start_url] if start_url else [
            "https://candidat.francetravail.fr/offres/recherche?lieux=75D&motsCles=developpeur"
        ]

    def parse(self, response):
        job_cards = response.css("li.result")
        self.logger.debug(f"Nombre d'offres trouvées : {len(job_cards)}")

        for job_card in job_cards:
            relative_url = job_card.css("a::attr(href)").get()
            if relative_url:
                job_url = response.urljoin(relative_url)
                self.logger.debug(f"Job URL: {job_url}")
                yield response.follow(
                    job_url,
                    callback=self.parse_job_detail
                )

        next_page = response.css("#zoneAfficherPlus > p > a::attr(href)").get()
        if next_page:
            self.logger.debug(f"Prochaine page trouvée : {next_page}")
            yield response.follow(next_page, callback=self.parse)

    def parse_job_detail(self, response):
        loader = ItemLoader(item=JobItem(), response=response)

        # Champs texte simples
        loader.add_css('title', 'main h1 span[itemprop="title"]::text')
        loader.add_css('company', 'div.media > div > h3::text')
        loader.add_css('contractType', 'dl > dd:nth-child(2)::text')
        loader.add_css('publishDate', 'p.t5.title-complementary > span:nth-child(1)::attr(content)')
        loader.add_css('description', 'div.description.col-sm-8.col-md-7 > p::text')
        loader.add_css('experience', 'ul.skill-list li span[itemprop="experienceRequirements"].skill-name::text')
        loader.add_css('skills',
                       'ul.skill-list li span[itemprop="skills"].skill-name::text, span.skill.skill-savoir span.skill-name::text')
        loader.add_css('workMode', 'dd[itemprop="baseSalary"]::text')

        postalCode = response.css('span[itemprop="address"] span[itemprop="postalCode"]::attr(content)').get()
        city = response.css('span[itemprop="address"] span[itemprop="addressLocality"]::attr(content)').get()
        region = response.css('span[itemprop="address"] span[itemprop="addressRegion"]::attr(content)').get()
        country = response.css('span[itemprop="address"] span[itemprop="addressCountry"]::attr(content)').get()

        location = {
            "postalCode": postalCode,
            "city": city,
            "region": region,
            "country": country,
        }

        loader.add_value('location', location)

        min_salary = response.css('dd span[itemprop="minValue"]::attr(content)').get()
        max_salary = response.css('dd span[itemprop="maxValue"]::attr(content)').get()
        value_salary = response.css('dd span[itemprop="value"]::attr(content)').get()
        unit_text = response.css('dd span[itemprop="unitText"]::attr(content)').get()

        if min_salary and max_salary:
            salary = {
                "min": float(min_salary),
                "max": float(max_salary),
                "unit": unit_text
            }
        elif value_salary:
            salary = {
                "value": float(value_salary),
                "unit": unit_text
            }
        else:
            salary = None

        if salary:
            loader.add_value('salary', salary)

        # Valeurs simples
        loader.add_value('url', response.url)

        # Infos entreprise sur page actuelle
        company_size = response.css('div.media > div > p:nth-child(2)::text').get()
        company_description = response.css('div.media > div > p.italic::text').get()
        company_url = response.css('div.media > div > p > a::attr(href)').get()

        loader.add_value('companyInfo', {
            'size': company_size,
            'description': company_description,
            'url': company_url
        })

        item = loader.load_item()

        # if company_url:
        #     yield response.follow(
        #         company_url,
        #         callback=self.parse_company_info,
        #         meta={'item': item}
        #     )
        # else:
        #     yield item
        yield item

    def parse_company_info(self, response):
        loader = ItemLoader(item=JobItem(), response=response)

        sector = response.css(
            "#contents app-page-employeur li:nth-child(1) span span::text"
        ).get()

        loader.add_value('companyInfo', {
            'sector': sector,
            'url': response.url
        })

        item = loader.load_item()

        yield item
