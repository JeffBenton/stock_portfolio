# Stock Portfolio

This is an app for buying and managing a stock portfolio.

## Installation

1. git clone this repository
2. $ cd client && npm install
3. $ cd .. && cd server && bundle install
4. $ rake db:migrate
5. cd .. && rake start

## Implementation Notes

This is a React application created with a rails api backend. Local development
uses a sqlite database while production utilizes postgres.