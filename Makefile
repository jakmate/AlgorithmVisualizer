all: compile link

compile:
	g++ -Isrc/include -c bubblesort.cpp

link:
	g++ bubblesort.o -o bubblesort -Lsrc/lib -lsfml-graphics -lsfml-window -lsfml-system