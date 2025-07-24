import scrapy

class JobItem(scrapy.Item):
    title = scrapy.Field()
    company = scrapy.Field()
    location = scrapy.Field()
    salary = scrapy.Field()
    description = scrapy.Field()
    contractType = scrapy.Field()
    experience = scrapy.Field()
    skills = scrapy.Field()
    publishDate = scrapy.Field()
    url = scrapy.Field()
    workMode = scrapy.Field()
    companyInfo = scrapy.Field()