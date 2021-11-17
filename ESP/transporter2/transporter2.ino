
/**
 * Created by K. Suwatchai (Mobizt)
 * 
 * Email: k_suwatchai@hotmail.com
 * 
 * Github: https://github.com/mobizt
 * 
 * Copyright (c) 2021 mobizt
 *
*/

/** This example will show how to authenticate using 
 * the legacy token or database secret with the new APIs (using config and auth data).
*/
#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#endif

#include <SoftwareSerial.h>

//Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

#define Pin_ST_NUCLEO_RX    5  //Pino D1 da placa Node MCU
#define Pin_ST_NUCLEO_TX    4  //Pino D2 da placa Node MCU

/* 1. Define the WiFi credentials */
#define WIFI_SSID "NET_2G37F336"
#define WIFI_PASSWORD "4F37F336"

/* 2. If work with RTDB, define the RTDB URL and database secret */
#define DATABASE_URL "https://se2021-2-tng-default-rtdb.firebaseio.com" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app
#define DATABASE_SECRET "HwkLuzWqGzOTWHAKmPIZUCUOF74BjCG5IrZDktaZ"

SoftwareSerial SSerial(Pin_ST_NUCLEO_RX, Pin_ST_NUCLEO_TX);

/* 3. Define the Firebase Data object */
FirebaseData fbdo;

/* 4, Define the FirebaseAuth data for authentication data */
FirebaseAuth auth;

/* Define the FirebaseConfig data for config data */
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;

/* SECTION: SETUP */

void setupConnection() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    /* Assign the certificate file (optional) */
    //config.cert.file = "/cert.cer";
    //config.cert.file_storage = StorageType::FLASH;

    /* Assign the database URL and database secret(required) */
    config.database_url = DATABASE_URL;
    config.signer.tokens.legacy_token = DATABASE_SECRET;

    Firebase.reconnectWiFi(true);

    /* Initialize the library with the Firebase authen and config */
    Firebase.begin(&config, &auth);

    //Or use legacy authenticate method
    //Firebase.begin(DATABASE_URL, DATABASE_SECRET);
}

void setup() {
    pinMode(2, INPUT);
    Serial.begin(115200);
    SSerial.begin(115200);
    setupConnection();
}

/* SECTION: MAIN */

int input = 0;

char message[30];

bool setValue(int value) {
  return Firebase.setInt(fbdo, "/power", value);
}

bool setStringValue(char * incomming) {
  return Firebase.setString(fbdo, "/data", incomming);
}

void read() {
  int posix = 1;
  while (SSerial.available()) {
    if(SSerial.read() == '[') {
          posix = SSerial.readBytesUntil(']',message, sizeof(message) - 1);
          message[posix] = '\0';
    }
  }
}

void loop()
{
    read();
    if (millis() - dataMillis > 5000)
    {
        dataMillis = millis();
        Serial.printf("Update status: %s\n", setStringValue(message) ? "success" : "error");
    }
}
