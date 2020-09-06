class DashboardController < ApplicationController
  protect_from_forgery :except => [:infos]

  def index
    @countries = Order.distinct.pluck(:country).to_a
  end

  def infos
    country = params[:country]
    country_orders = Order.where(country: country)
    total_revenue = country_orders.sum("unit_price*quantity").round(0)
      .to_s
      .reverse
      .scan(/\d{1,3}/)
      .join(" ")
      .reverse
    average = (country_orders.sum("unit_price*quantity") / country_orders.distinct.pluck(:order_id).count).round(2)
    customer_number = country_orders.distinct.pluck(:customer_id).count
    chart_data = get_monthly_stats(country)

    render json: {
      total_revenue: total_revenue,
      average: average,
      customer_number: customer_number,
      chart_data: chart_data
    }
  end

  def get_monthly_stats(country)
    country_orders = Order.where(country: country).order(:date)
    index_month = country_orders.first.date
    end_month = country_orders.last.date
    month_revenue = []
    month_date = []
    while index_month.strftime("%Y%m") <= end_month.strftime("%Y%m")
      month_revenue << country_orders.where(date: index_month.beginning_of_month..index_month.end_of_month).sum("unit_price*quantity")
      month_date << index_month.strftime("%Y-%m")
      index_month = index_month + 1.month
    end
    { month_revenue: month_revenue, month_date: month_date }
  end
end
