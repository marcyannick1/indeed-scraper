from typing import Optional, List, Union
from pydantic import BaseModel
from datetime import datetime


class SalaryRange(BaseModel):
    min: float
    max: float
    unit: Optional[str] = None


class SalaryValue(BaseModel):
    value: float
    unit: Optional[str] = None


class CompanyInfo(BaseModel):
    size: Optional[str] = None
    description: Optional[str] = None
    url: Optional[str] = None


class Location(BaseModel):
    postalCode: Optional[str] = None
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None


class JobItem(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[Location] = None
    salary: Optional[Union[SalaryRange, SalaryValue]] = None
    description: Optional[str] = None
    contractType: Optional[str] = None
    experience: Optional[str] = None
    skills: Optional[List[str]] = None
    publishDate: Optional[datetime] = None
    url: Optional[str] = None
    workMode: Optional[str] = None
    companyInfo: Optional[CompanyInfo] = None
