CREATE TABLE IF NOT EXISTS agent_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agentName TEXT,
        closingCash REAL,
        posBalance REAL,
        addedCash REAL,
        removedFunds REAL,
        startingMoney REAL,
        startingCash REAL,
        commissionRate REAL,
        date TEXT,

        -- computed fields for convenience
        totalCash REAL,
        processedTotal REAL,
        calculatedCommission REAL,
        expectedTotalWithoutCommission REAL,
        actualTotal REAL,
        actualCommission REAL,
        topping REAL,
        status TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );