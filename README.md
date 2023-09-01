# Medical Office App

## Description

This is a basic management web application for Medical Office, that can track patients and their appointments & test results via dashboard.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- sqlite3

## Technologies

- STI & CanCanCan gem
- Redux library

## Features

The application has two main types of users Admins and Doctors, this is achieved through utilization of the STI (Single Table Inheritance) and "CanCanCan" gem, that handles permissions for different roles.

Admins can:

- Create new Users (both types), Patients & Appointments
- Edit information for Doctors, Patients & Appointments
- Remove Doctors, Patients & Appointments

Note: Admin can't delete or update information for other Admins.

Doctors can:

- Can see his Patients & upcoming Appointments
- Can See Test Results of their patients
- Can Create new Tests & update them

```

```
