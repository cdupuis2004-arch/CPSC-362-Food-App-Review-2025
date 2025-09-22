/*
Saltines
CMPR121
Group Project Part A
*/
// This comment was made in the Test
//CODE EDIT TEST
//CODE EDIT TEST
//Group project 362
//kidus's request to merge
#include<iostream>
#include<cstdlib>
#include<ctime>
#include<fstream>
#include<string>
#include <windows.h>
#include <Lmcons.h>

using namespace std;
void kms(int a);

int main()
{
	int answer;
	int credits;// Defining credits for file
	string name;
	ifstream inFile;
	ofstream alinFile;
	inFile.open("Saltines_Credits.txt", ios::app);// CREDITS FILES
	alinFile.open("Saltines_User.txt");//user's name
	cout << "What is your name?";
	cin >> name;

	alinFile << name;
	inFile >> credits;
	inFile.close();
	alinFile.close();


	int fin = 1;

	if (credits > 20)
	{
		ofstream outFile;
		outFile.open("Saltines_Credits.txt", ios::app);
		credits = 20;
		outFile << credits;
	}

	while (fin == 1)
	{
		cout << endl << "*** Saltines ***" << endl << endl;
		cout << "*** MAIN MENU ***" << endl << endl;

		cout << "Please select one of the following:" << endl << endl; //Displaying options
		cout << "   1: Display my available credits\n   2: Add credits to my account" << endl;
		cout << "   3: Play the guessing game\n   4: Display my statistics" << endl;
		cout << "   5: Save my statistics\n   6: To exit" << endl;

		cin >> answer;

		while (answer > 6) //try again statement
		{
			cout << "Invalid entry, please try again:\n";
			cin >> answer;
		}


		switch (answer) // switch statement showing the users case answer
		{
		case 1:
			cout << "You entered 1: Display my available credits"; // case 1 TOKEN DISPLAY FINISHED (Chris)
			{
				cout << endl;
				ifstream inFile;
				inFile.open("Saltines_Credits.txt", ios::app);
				inFile >> credits;
				cout << "Your total credits are " << credits << endl;
				inFile.close();
			}
			break;
		case 2:
			cout << "You entered 2: Add credits to my account"; // case 2 ADDING TOKENS FINISHED (Chris)
			{
				cout << endl; // opens file to get current credits
				ifstream inFile;
				inFile.open("Saltines_Credits.txt", ios::app);
				inFile >> credits;
				inFile.close();
				cout << "You currently have " << credits << " credits.\nHow many credits would you like to add?\n"
					<< "   1: 1\n"
					<< "   2: 2\n"
					<< "   3: 5\n"
					<< "   4: 10\n"
					<< "   5: Set to 20 (MAX!)\n"
					<< "   6: Reset Tokens (5)\n";
				int x;
				cin >> x;
				while (x > 6) // Number validator
				{
					cout << "Please enter a valid option\n";
					cin >> x;
				}
				kms(x); // SWITCH STATEMENT
				inFile.open("Saltines_Credits.txt");
				inFile >> credits;
				inFile.close();
				if (credits > 20) // Making sure credits do not surpass 20
				{
					cout << endl << "Error, your credits will not surpass 20!" << endl;
					credits = 20;
					ofstream outFile;
					outFile.open("Saltines_Credits.txt");
					outFile << credits;
					outFile.close();
				}
			}
			break;
		case 3:
			cout << "You entered 3: Play the guessing game"; // case 3
			{

				ifstream inFile; //new
				inFile.open("Saltines_Credits.txt");
				inFile >> credits;
				inFile.close();//new


				char response = 'y';
				while (response == 'y')
				{
					--credits;
					int random, guess;
					cout << endl;
					cout << "Guess a number 1-10: "; //playing game
					cin >> guess;

					random = rand() % 10 + 1;


					if (random == guess)
					{
						cout << "\nYou guessed correct! The number was " << random << "!";
						credits = credits + 2;
						if (credits > 20) // Making sure credits do not surpass 20
						{
							cout << "Error, your credits will not surpass 20!" << endl;
							credits = 20;
						}
						cout << endl << "You now have " << credits << " credits!" << endl;
					}
					else
					{
						cout << guess << " was not the number. The correct number was " << random << ".";
						cout << "You now have " << credits << " credits!" << endl;
					}
					ofstream outFile;//new
					outFile.open("Saltines_Credits.txt");
					outFile << credits;
					outFile.close(); // new

					cout << endl << endl;
					cout << "Would you like to play again? 'y' for yes, 'n' for no: ";
					cin >> response;


				}
			}
			break;
		case 4:
			cout << "You entered 4: Display my statistics\n\n"; // case 4 NEEDS TO BE FINISHED
			{
				ifstream nameFile, creditFile;
				nameFile.open("Saltines_User.txt");
				creditFile.open("Saltines_Credits.txt");
				time_t curr_time;
				curr_time = time(NULL);
				char* tm = ctime(&curr_time);

				nameFile >> name;
				creditFile >> credits;

				cout << tm << endl;
				cout << "Player: " << name << endl;
				cout << "Credits: " << credits << endl;

			}
			break;
		case 5:
			cout << "You entered 5: Save my statistics"; // case 5 NEEDS TO BE FINISHED
			{

			}
			break;
		case 6:
			cout << "You entered 6: Thank you for using Saltine's software. Good Bye!";// case 6
			return 0;
			break;
		default:
			break;
		}

		cout << endl << "To return to the main menu, please press '1', if you are finished, hit any key: ";
		cin >> fin;

	}

	cout << endl;
	return 0;
}


void kms(int a) // ADDS TOKENS
{
	int credits; // Defines token in function
	ifstream inFile;
	inFile.open("Saltines_Credits.txt", ios::app);
	inFile >> credits;
	inFile.close();

	ofstream outFile; // Opens file to put tokens in file
	outFile.open("Saltines_Credits.txt");//resets file so token amount is correct

	switch (a)
	{
	case 1:
	{
		credits = credits + 1;
		outFile << credits << endl;
		cout << endl << "You have " << credits << " credits!";

	}
	break;
	case 2:
	{
		credits = credits + 2;
		outFile << credits << endl;
		cout << endl << "You have " << credits << " credits!";
	}
	break;
	case 3:
	{
		credits = credits + 5;
		outFile << credits << endl;
		cout << endl << "You have " << credits << " credits!";
	}
	break;
	case 4:
	{
		credits = credits + 10;
		outFile << credits << endl;
		cout << endl << "You have " << credits << " credits!";
	}
	break;
	case 5:
	{
		credits = 20;
		outFile << credits << endl;
		cout << endl << "You have " << credits << " credits!";
	}
	break;
	case 6:
	{
		credits = 5;
		outFile << credits << endl;
		cout << endl << "Credits have been reset to " << credits;
	}
	break;
	default:
		break;
	}
	outFile.close();

}


