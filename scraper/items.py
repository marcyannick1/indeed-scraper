import scrapy
from itemloaders.processors import TakeFirst


class JobItem(scrapy.Item):
    title = scrapy.Field(output_processor=TakeFirst())
    company = scrapy.Field(output_processor=TakeFirst())
    location = scrapy.Field(output_processor=TakeFirst())
    salary = scrapy.Field(output_processor=TakeFirst())
    description = scrapy.Field(output_processor=TakeFirst())
    contractType = scrapy.Field(output_processor=TakeFirst())
    experience = scrapy.Field(output_processor=TakeFirst())
    skills = scrapy.Field()
    publishDate = scrapy.Field(output_processor=TakeFirst())
    url = scrapy.Field(output_processor=TakeFirst())
    workMode = scrapy.Field(output_processor=TakeFirst())
    companyInfo = scrapy.Field(output_processor=TakeFirst())
