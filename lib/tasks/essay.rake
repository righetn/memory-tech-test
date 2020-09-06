namespace :test do
    task :compute => :environment do
        puts Order.count
        puts Order.sum("unit_price*quantity")
        puts Order.sum("unit_price*quantity") / Order.distinct.pluck(:order_id).count
        puts Order.distinct.pluck(:customer_id).count
    end
end
