# Compiler and flags
CXX = g++
CXXFLAGS = -IF:/SFML-2.6.1/include -IF:/TGUI-1.5/include
LDFLAGS = -LF:/SFML-2.6.1/lib -LF:/TGUI-1.5/lib

# Libraries to link (FDS, SFML, and TGUI)
LDLIBS = -lsfml-graphics -lsfml-window -lsfml-system -ltgui

# Targets
all: bubblesort

bubblesort: bubblesort.o
	$(CXX) $^ -o $@ $(LDFLAGS) $(LDLIBS)

bubblesort.o: bubblesort.cpp
	$(CXX) $(CXXFLAGS) -c $<

clean:
	del /Q bubblesort.exe bubblesort.o