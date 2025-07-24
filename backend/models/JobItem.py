from pydantic import BaseModel
from typing import Optional, List

class CompanyInfo(BaseModel):
    size: Optional[str]
    sector: Optional[str]
    description: Optional[str]

class JobItem(BaseModel):
    title: str
    company: Optional[str]
    location: Optional[str]
    salary: Optional[str]
    salaryMin: Optional[float]
    salaryMax: Optional[float]
    description: Optional[str]
    contractType: Optional[str]
    experience: Optional[str]
    skills: Optional[List[str]]
    publishDate: Optional[str]
    url: Optional[str]
    workMode: Optional[str]
    companyInfo: Optional[CompanyInfo]
