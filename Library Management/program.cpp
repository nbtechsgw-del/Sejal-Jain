#include<iostream>
#include<string>
using namespace std;

class book {
public:
    int id;
    string name;
    bool isissued;
};

int main() {
    book b[100];
    int count = 0;
    int choice;

    while (true) {

        cout << "\n1. Add Book\n";
        cout << "2. Issue Book\n";
        cout << "3. Return Book\n";
        cout << "4. Display Book\n";
        cout << "5. Exit\n";

        cout << "Enter choice: ";
        cin >> choice;

        // ADD BOOK
        if (choice == 1) {
            cout << "Enter Book ID: ";
cin >> b[count].id;

cout << "Enter Book Name: ";
cin.ignore();
getline(cin, b[count].name);

            b[count].isissued = false;
            count++;

            cout << "Book Added Successfully\n";
        }

        // ISSUE BOOK
        else if (choice == 2) {
            int id, found = 0;
            cout << "Enter Book ID to issue: ";
            cin >> id;

            for (int i = 0; i < count; i++) {
                if (b[i].id == id) {
                    found = 1;
                    if (b[i].isissued == false) {
                        b[i].isissued = true;
                        cout << "Book Issued\n";
                    } else {
                        cout << "Already Issued\n";
                    }
                }
            }

            if (!found) cout << "Book not found\n";
        }

        // RETURN BOOK
        else if (choice == 3) {
            int id, found = 0;
            cout << "Enter Book ID to return: ";
            cin >> id;

            for (int i = 0; i < count; i++) {
                if (b[i].id == id) {
                    found = 1;
                    if (b[i].isissued == true) {
                        b[i].isissued = false;
                        cout << "Book Returned\n";
                    } else {
                        cout << "This book was not issued\n";
                    }
                }
            }

            if (!found) cout << "Book not found\n";
        }

        // DISPLAY
        else if (choice == 4) {
            for (int i = 0; i < count; i++) {
                cout << "\nID: " << b[i].id;
                cout << "\nName: " << b[i].name;
                cout << "\nStatus: " << (b[i].isissued ? "Issued" : "Available") << endl;
            }
        }

        // EXIT
        else if (choice == 5) {
            break;
        }

        else {
            cout << "Invalid choice\n";
        }
    }

    return 0;
}