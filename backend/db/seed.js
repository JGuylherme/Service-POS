const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const runSeed = async () => {
  try {
    console.log('🌱 Seeding database...');

    // 1. Customers (50)
    const customers = [];
    for (let i = 0; i < 50; i++) {
      customers.push([
        uuidv4(),
        faker.person.fullName(),
        faker.internet.email(),
        faker.number.int(11),
        faker.phone.number()
      ]);
    }
    for (const [id, name, email, doc, phone] of customers) {
      await db.query(
        `INSERT INTO customers (id, name, email, document, phone_number) VALUES (?, ?, ?, ?, ?)`,
        [id, name, email, doc, phone]
      );
    }

    // 2. Employees (10)
    const roles = ['employee', 'admin'];
    const employees = [];
    for (let i = 0; i < 10; i++) {
      employees.push([
        uuidv4(),
        faker.person.fullName(),
        faker.internet.email(),
        `hashedpass${i}`,  // Replace with real password hashes in production
        roles[Math.floor(Math.random() * roles.length)],
        faker.phone.number()
      ]);
    }
    const employeeIds = [];
    for (const [id, name, email, pass, role, phone] of employees) {
      await db.query(
        `INSERT INTO employees (id, name, email, password_hash, role, phone_number) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, email, pass, role, phone]
      );
      employeeIds.push({ id, name });
    }

    // 3. Services (8)
    const servicesData = [
      ['Haircut', 'Classic haircut with scissors and clippers', 50.00, 30],
      ['Beard Trim', 'Detailed beard shaping and grooming', 30.00, 20],
      ['Hair Coloring', 'Full-color dye', 150.00, 90],
      ['Massage', '30-minute shoulder and back massage', 70.00, 30],
      ['Nail Polish', 'Basic nail polish application', 25.00, 20],
      ['Hair Wash', 'Shampoo + conditioner service', 20.00, 15],
      ['Facial', 'Facial cleansing and moisturizer', 80.00, 45],
      ['Eyebrow Shaping', 'Eyebrow trimming and shaping', 35.00, 15]
    ];

    const serviceIds = [];
    for (const [name, desc, price, duration] of servicesData) {
      const id = uuidv4();
      await db.query(
        `INSERT INTO services (id, name, description, price, duration_min) VALUES (?, ?, ?, ?, ?)`,
        [id, name, desc, price, duration]
      );
      serviceIds.push({ id, name });
    }

    // 4. employees_services - assign all services to all employees
    for (const employee of employeeIds) {
      for (const service of serviceIds) {
        await db.query(
          `INSERT INTO employees_services (employee_id, service_id) VALUES (?, ?)`,
          [employee.id, service.id]
        );
      }
    }

    // 5. Create a test appointment with first customer, employee and service
    const appointmentId = uuidv4();
    const firstCustomerId = customers[0][0];
    const firstEmployeeId = employeeIds[0].id;
    const firstServiceId = serviceIds[0].id;

    await db.query(
      `INSERT INTO appointments (id, customer_id, employee_id, service_id, start_time, end_time, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        appointmentId,
        firstCustomerId,
        firstEmployeeId,
        firstServiceId,
        '2025-07-14 10:00:00',
        '2025-07-14 10:30:00',
        'completed',
        'Test appointment seeded'
      ]
    );

    // 6. Payment for appointment
    await db.query(
      `INSERT INTO payments (id, appointment_id, amount, method, paid_at, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        appointmentId,
        50.00,
        'cash',
        '2025-07-14 10:35:00',
        'completed'
      ]
    );

    // 7. Time tracking for appointment
    await db.query(
      `INSERT INTO time_tracking (id, appointment_id, employee_id, start_time, end_time)
       VALUES (?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        appointmentId,
        firstEmployeeId,
        '2025-07-14 10:00:00',
        '2025-07-14 10:30:00'
      ]
    );

    console.log('✅ Seed complete!');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

runSeed();
