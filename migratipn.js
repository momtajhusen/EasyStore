Schema::create('users', function (Blueprint $table) {
    $table->id('user_id'); // Primary key for users
    $table->string('username')->unique(); // Unique username for login
    $table->string('password'); // Encrypted user password
    $table->string('email')->unique(); // User's unique email address
    $table->enum('role', ['admin', 'owner', 'manager', 'staff', 'customer', 'vendor', 'delivery_person'])->nullable(); // Role of the user in the system
    $table->foreignId('store_id')->nullable()->constrained('stores')->onDelete('cascade'); // Linked store ID for store-related roles
    $table->json('phone_numbers')->nullable(); // JSON to handle multiple phone numbers
    $table->string('profile_picture')->nullable(); // URL of the user's profile picture
    $table->date('dob')->nullable(); // Date of birth
    $table->enum('gender', ['male', 'female', 'other'])->nullable(); // Gender of the user
    $table->text('address')->nullable(); // Full address of the user
    $table->json('social_accounts')->nullable(); // JSON of user's connected social accounts (e.g., Facebook, Google)
    $table->string('social_login_provider')->nullable(); // Social login provider name
    $table->string('social_login_id')->nullable(); // Social login unique identifier
    $table->string('token')->nullable(); // User session or API token
    $table->string('otp')->nullable(); // OTP for verification purposes
    $table->timestamp('email_verified_at')->nullable(); // Timestamp when email was verified
    $table->timestamp('phone_verified_at')->nullable(); // Timestamp when phone number was verified
    $table->enum('status', ['active', 'inactive', 'banned', 'suspended', 'pending'])->default('active'); // Current account status
    $table->json('preferences')->nullable(); // User-specific settings/preferences in JSON format
    $table->timestamp('last_login')->nullable(); // Last login timestamp
    $table->timestamp('last_password_change')->nullable();
    $table->boolean('is_verified')->default(false);
    $table->boolean('two_factor_enabled')->default(false);
    $table->unsignedSmallInteger('failed_login_attempts')->default(0); // Failed login attempts counter
    $table->timestamp('account_locked_until')->nullable(); // Account lock duration
    $table->string('auth_provider_token')->nullable(); // Token provided by third-party auth providers
    $table->text('biography')->nullable(); // User's bio or short description
    $table->string('occupation')->nullable(); // User's occupation or job title
    $table->timestamp('membership_expiry')->nullable(); // Expiry date for premium membership
    $table->json('activity_logs')->nullable(); // JSON of user activity (e.g., login, actions)
    $table->unsignedInteger('loyalty_points')->default(0); // Points for rewards or loyalty programs
    $table->boolean('is_online')->default(false); // Whether the user is currently online
    $table->timestamps(); // Created at and updated at timestamps
});

Schema::create('stores', function (Blueprint $table) {
    $table->id('store_id'); // Primary key for stores
    $table->foreignId('owner_id')->constrained('users')->onDelete('cascade'); // ID of the user who owns the store
    $table->string('store_name')->unique(); // Unique name of the store
    $table->string('location')->nullable(); // Address or geographical location of the store
    $table->string('contact_number')->nullable(); // Store's contact phone number
    $table->string('store_email')->nullable(); // Store's email address
    $table->string('opening_hours')->nullable(); // Operating hours of the store
    $table->string('store_logo')->nullable(); // URL of the store's logo
    $table->enum('store_type', ['grocery', 'pharmacy', 'electronics', 'fashion', 'restaurant', 'home_services'])->nullable(); // Type of store
    $table->string('tax_number')->nullable(); // Tax identification number for the store
    $table->string('website')->nullable(); // URL of the store's website
    $table->text('description')->nullable(); // Brief description of the store
    $table->date('registration_date')->nullable(); // Date the store was registered
    $table->boolean('is_verified')->default(false); // Whether the store is verified
    $table->json('preferences')->nullable(); // Store-specific settings/preferences in JSON format
    $table->decimal('rating', 3, 2)->default(0.0); // Average customer rating (e.g., 4.5 out of 5)
    $table->timestamps(); // Created at and updated at timestamps
    $table->string('store_banner')->nullable(); // URL of the store's banner image
    $table->integer('delivery_radius')->default(5); // Delivery coverage radius in kilometers
    $table->string('bank_account_number')->nullable(); // Store's bank account number for payments
    $table->string('ifsc_code')->nullable(); // Bank IFSC code for the account
    $table->string('payment_gateway_account')->nullable(); // Payment gateway account for online payments
    $table->json('working_days')->nullable(); // JSON of working days (e.g., Monday-Friday)
    $table->boolean('is_featured')->default(false); // Whether the store is featured/promoted
    $table->unsignedInteger('orders_count')->default(0); // Total number of orders handled
    $table->json('service_areas')->nullable(); // JSON of areas serviced by the store
    $table->timestamp('last_updated_by_admin')->nullable(); // Timestamp when admin last updated the store
    $table->string('store_theme')->nullable(); // Theme or design preference for the store
    $table->enum('store_status', ['open', 'closed', 'closed_for_the_day'])->default('closed'); // Current status of the store
    $table->timestamp('last_checked')->nullable(); // Last timestamp when store's status was checked/updated
});  

Schema::create('categories', function (Blueprint $table) {
    $table->id('categories_id');
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
    $table->string('name');
    $table->text('description')->nullable(); // Description for the category
    $table->boolean('is_active')->default(true); // Status of the category
    $table->string('image')->nullable(); // Image for the category (store image path or URL)
    $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null'); // Created by user
    $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null'); // Updated by user
    $table->timestamps();
});

Schema::create('subcategories', function (Blueprint $table) {
    $table->id('subcategories_id');
    $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
    $table->string('name');
    $table->text('description')->nullable(); 
    $table->boolean('is_active')->default(true); 
    $table->string('image')->nullable(); // Image for the subcategory
    $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null'); // Created by user
    $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null'); // Updated by user
    $table->foreignId('parent_id')->nullable()->constrained('subcategories')->onDelete('set null'); // Nested subcategory support
    $table->timestamps();
});

Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->foreignId('store_id')->nullable()->constrained('stores')->onDelete('cascade');
    $table->foreignId('subcategory_id')->constrained('subcategories')->onDelete('cascade');
    $table->string('name');
    $table->text('description')->nullable(); // Product description
    $table->string('image_url')->nullable(); // URL for product image
    $table->json('multiple_images')->nullable(); // Multiple image URLs
    $table->string('sku')->unique(); // Unique SKU for the product
    $table->string('barcode')->nullable(); // Barcode for the product
    $table->decimal('purchase_price', 10, 2); // Purchase price
    $table->decimal('sell_price', 10, 2); // Selling price
    $table->decimal('discount', 5, 2)->default(0); // Discount on the product
    $table->boolean('is_active')->default(true); // Product status (active/inactive)
    $table->boolean('is_featured')->default(false); // Whether the product is featured
    $table->date('expiry_date')->nullable(); // Expiry date for perishable items
    $table->integer('min_order_quantity')->default(1); // Minimum order quantity
    $table->integer('max_order_quantity')->nullable(); // Maximum order quantity

    // Unit type and value (static per product)
    $table->enum('unit_type', [
        'piece', 'kg', 'g', 'liter', 'ml', 'meter', 'foot', 'dozen', 'pack', 'set', 'cubic_meter'
    ]); // Unit type (piece, kg, g, etc.)
    $table->decimal('unit_value', 10, 2)->nullable(); // Value per unit (e.g., 1.5 liters, 5 kg, etc.)

    $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null'); // Created by user
    $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null'); // Updated by user
    $table->timestamps();
});

 
Schema::create('inventory', function (Blueprint $table) {
    $table->id('inventory_id');
    $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Product reference
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade'); // Store reference

    // Stock management
    $table->decimal('quantity_in_stock', 10, 2)->default(0); // Current stock level of the product
    $table->decimal('available_quantity', 10, 2)->default(0); // Quantity available for sale
    $table->decimal('reserved_quantity', 10, 2)->default(0); // Quantity reserved for orders
    $table->decimal('damaged_quantity', 10, 2)->default(0); // Quantity marked as damaged

    // Inventory tracking
    $table->decimal('reorder_level', 10, 2)->default(0); // Minimum quantity to trigger reorder
    $table->decimal('reorder_quantity', 10, 2)->nullable(); // Suggested reorder quantity
    $table->boolean('is_out_of_stock')->default(false); // Whether the product is out of stock

    // Audit and history tracking
    $table->date('last_stock_update')->nullable(); // Last stock update date
    $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null'); // User who updated stock

    $table->timestamps();
});


Schema::create('stock_movements', function (Blueprint $table) {
    $table->id('id');
    $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
    $table->enum('movement_type', ['purchase', 'sale', 'return', 'adjustment', 'transfer', 'internal_use']);
    $table->decimal('quantity', 10, 2);
    $table->string('unit_type');
    $table->decimal('unit_value', 10, 2)->nullable();
    $table->decimal('price_per_unit', 10, 2);
    $table->decimal('total_price', 10, 2);
    $table->timestamp('movement_date')->useCurrent();
    $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
    $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
    $table->text('notes')->nullable();
    $table->timestamps();
});

Schema::create('sales', function (Blueprint $table) {
    $table->id('sales_id');
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
    $table->foreignId('customer_due_id')->nullable()->constrained('customer_dues')->onDelete('set null'); // Link to customer_dues if due exists
    $table->decimal('total_amount', 10, 2); // Total sale amount
    $table->decimal('paid_amount', 10, 2); // Amount paid for the sale
    $table->decimal('remaining_amount', 10, 2)->default(0); // Remaining amount after payment
    $table->enum('sale_status', ['completed', 'pending', 'cancelled'])->default('completed'); // Sale status
    $table->enum('payment_method', ['cash', 'credit', 'mobile_payment', 'bank_transfer'])->default('cash'); // Payment method
    $table->enum('payment_status', ['completed', 'pending', 'partially_paid'])->default('completed'); // Payment status
    $table->timestamp('sale_date')->useCurrent(); // Date of sale
    $table->decimal('discount', 5, 2)->default(0); // Discount on sale
    $table->decimal('tax_amount', 10, 2)->default(0); // Tax on sale
    $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null'); // Created by user
    $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null'); // Updated by user
    $table->boolean('is_refunded')->default(false); // Whether the sale was refunded
    $table->decimal('refund_amount', 10, 2)->default(0); // Refund amount if applicable
    $table->enum('sale_type', ['customer', 'internal'])->default('customer'); // Sale type: internal use or customer sale
    $table->timestamps();
});

Schema::create('sales_products', function (Blueprint $table) {
    $table->id('id');
    $table->foreignId('sales_id')->constrained('sales')->onDelete('cascade'); // Link to sales table
    $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Link to products table
    $table->foreignId('product_variant_id')->nullable()->constrained('product_variants')->onDelete('set null'); // If there are variants, e.g., size, color
    $table->decimal('quantity', 10, 2); // Quantity sold
    $table->decimal('purchase_price', 10, 2); // Purchase price per unit of the product
    $table->decimal('sell_price', 10, 2); // Sell price per unit of the product
    $table->decimal('total_price', 10, 2); // Total price for the quantity sold (quantity * sell_price)
    $table->decimal('tax_rate', 5, 2)->default(0); // Tax rate applied to the product (e.g., 18%)
    $table->decimal('tax_amount', 10, 2)->default(0); // Tax amount for the product (calculated)
    $table->decimal('discount', 5, 2)->default(0); // Discount on the product, if any
    $table->enum('discount_type', ['flat', 'percentage'])->default('flat'); // Discount type (flat or percentage)
    $table->decimal('profit', 10, 2); // Profit (sell_price - purchase_price) * quantity
    $table->decimal('total_discount', 10, 2)->default(0); // Total discount applied to the product
    $table->boolean('is_returned')->default(false); // Whether the product was returned
    $table->decimal('return_amount', 10, 2)->default(0); // Amount refunded if the product was returned
    $table->text('notes')->nullable(); // Any additional notes about the product (e.g., special conditions)
    $table->timestamps();
});

// Customer Dues Table (updated schema for due tracking)
Schema::create('customer_dues', function (Blueprint $table) {
    $table->id();
    $table->foreignId('sales_id')->constrained('sales')->onDelete('cascade');
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
    $table->string('customer_name'); // Customer name
    $table->string('customer_contact')->nullable(); // Customer contact details
    $table->text('customer_address')->nullable(); // Customer address
    $table->decimal('total_due', 10, 2); // Total outstanding amount
    $table->decimal('total_paid', 10, 2)->default(0); // Total paid amount
    $table->decimal('remaining_amount', 10, 2)->default(0); // Remaining amount
    $table->text('remarks')->nullable(); // Additional remarks
    $table->timestamps(); // For tracking the record's creation and update time
});

// Customer Due Transactions Table (same as before)
Schema::create('customer_due_transactions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('customer_due_id')->constrained('customer_dues')->onDelete('cascade'); // Link to customer_dues
    $table->decimal('transaction_amount', 10, 2); // Transaction amount (payment or due addition)
    $table->enum('transaction_type', ['due', 'payment']); // Whether it's a payment or a due
    $table->text('remarks')->nullable(); // Additional transaction remarks
    $table->timestamps(); // Transaction date/time
});

Schema::create('stock_adjustments', function (Blueprint $table) {
    $table->id('adjustment_id');
    $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Product reference
    $table->foreignId('store_id')->constrained('stores')->onDelete('cascade'); // Store reference
    $table->decimal('adjusted_quantity', 10, 2); // Quantity adjusted
    $table->enum('adjustment_type', ['increase', 'decrease']); // Whether stock was increased or decreased
    $table->string('unit_type'); // Unit type used in the adjustment (e.g., piece, kg, g, liter)
    $table->decimal('unit_value', 10, 2)->nullable(); // Value per unit adjusted (optional)
    $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null'); // User who made the adjustment
    $table->timestamp('adjustment_date')->useCurrent(); // Adjustment date
    $table->text('reason')->nullable(); // Reason for the adjustment
    $table->timestamps();
});





Schema::create('roles', function (Blueprint $table) {
    $table->id('role_id'); // Primary key for roles
    $table->string('role_name')->unique(); // Role name (e.g., 'owner', 'customer', etc.)
    $table->string('slug')->unique(); // Role slug for programmatic use (e.g., 'owner', 'customer')
    $table->text('description')->nullable(); // Description of the role
    $table->unsignedBigInteger('parent_role_id')->nullable(); // For hierarchical roles (sub-roles)
    $table->foreign('parent_role_id')->references('role_id')->on('roles')->onDelete('set null'); // Self-referencing relationship
    $table->boolean('is_active')->default(true); // Whether the role is active
    $table->json('permissions')->nullable(); // JSON for role-specific permissions
    $table->timestamps(); // Timestamps for created_at and updated_at
});

Schema::create('user_roles', function (Blueprint $table) {
    $table->id(); // Primary key
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Link to users table
    $table->foreignId('role_id')->constrained('roles')->onDelete('cascade'); // Link to roles table
    $table->foreignId('store_id')->nullable()->constrained('stores')->onDelete('cascade'); // Link to stores (if role is store-specific)
    $table->foreignId('assigned_by')->nullable()->constrained('users')->onDelete('set null'); // Who assigned the role
    $table->date('start_date')->nullable(); // Role assignment start date
    $table->date('end_date')->nullable(); // Role assignment end date (for temporary roles)
    $table->enum('status', ['active', 'pending', 'revoked', 'expired'])->default('active'); // Role status
    $table->json('custom_permissions')->nullable(); // JSON for role-specific permission overrides
    $table->timestamps(); // Created at and updated at timestamps
});

Schema::create('permissions', function (Blueprint $table) {
    $table->id('permission_id'); // Primary key
    $table->string('permission_name')->unique(); // Unique name of the permission (e.g., "Edit Product")
    $table->string('slug')->unique(); // Unique identifier used internally (e.g., "edit-product")
    $table->string('module')->nullable(); // Grouping for related permissions (e.g., "Product Management")
    $table->text('description')->nullable(); // Detailed description of the permission
    $table->boolean('is_active')->default(true); // Whether the permission is active or not
    $table->timestamps(); // Created at and updated at timestamps
});

Schema::create('role_permissions', function (Blueprint $table) {
    $table->id(); // Primary key
    $table->foreignId('role_id')->constrained('roles')->onDelete('cascade'); // Link to roles table
    $table->foreignId('permission_id')->constrained('permissions')->onDelete('cascade'); // Link to permissions table
    $table->foreignId('granted_by')->nullable()->constrained('users')->onDelete('set null'); // Tracks which user granted the permission
    $table->enum('status', ['active', 'revoked', 'pending'])->default('active'); // Status of the permission assignment
    $table->timestamps(); // Created at and updated at timestamps
});

Schema::create('user_permissions', function (Blueprint $table) {
    $table->id(); // Primary key
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Link to users table
    $table->foreignId('permission_id')->constrained('permissions')->onDelete('cascade'); // Link to permissions table
    $table->foreignId('store_id')->nullable()->constrained('stores')->onDelete('set null'); // Link to stores (if the permission is store-specific)
    $table->foreignId('granted_by')->nullable()->constrained('users')->onDelete('set null'); // Tracks which user granted the permission
    $table->enum('status', ['active', 'revoked', 'pending'])->default('active'); // Status of the permission assignment
    $table->timestamp('expires_at')->nullable(); // Expiry date for temporary permissions
    $table->timestamps(); // Created at and updated at timestamps
});




