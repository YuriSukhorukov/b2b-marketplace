import React from 'react';
import Offer from './Card/Offer/index';
import Secure from './Rate/Secure/index';
import { 
  withKnobs, 
  text, 
  boolean, 
  number,
  date,
  array,
  select
}          from "@storybook/addon-knobs";

export default {
  title: 'Cards',
  decorators: [withKnobs]
};

export const OfferCard = () => {
  let offer = {
    title: number("Название оффера", 1),
    price: number("Цена", 1),
    currency: select("Валюта", [{label: "Рубль", currency: "ruble"}, {label: "Доллар", currency: "dollar"}]),
    value: number("Количество", 1),
    datePublication: date("Дата публикации", new Date('2016-03-02 13:57')),
    dateExpiration: date("Дата истечения", new Date('2016-03-02 13:57')),
    description: text("Описание", "Оригинальная белорусская сгущенка."),
    tags: array("Теги", ["Продукты питания", "Молочные продукты", "Молоко концентрированное"]),
    proposalsAmount: number("Количетсво откликнувшихся", 5),
    isVerified: boolean("Верифицирован", true),
    turnover: number("Оборот", 5),
    type: select("Тип предложения", [{label: "Покупка", type: "buy"}, {label: "Продажа", type: "sell"}])
  }

  return (
    <div>
      <Offer {...offer} />
    </div>
  )
};