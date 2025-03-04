
import 'package:flutter/material.dart';
import 'package:mobile/pages/historyPage.dart';
import 'package:mobile/pages/home.dart';

class BottomNavBar extends StatefulWidget {
  const BottomNavBar({super.key});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  int currentIndex = 0;
  late final HomePage home;
  late final HistoryPage history;
  late List<Widget> pages = [];

  @override
  void initState() {
    home = HomePage();
    history = HistoryPage();
    pages = [home, history];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        showSelectedLabels: true,
        unselectedItemColor: Colors.grey,
        fixedColor: Colors.black,
        onTap: (index) {
          setState(() {
            currentIndex = index;
          });
        },
        currentIndex: currentIndex,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.history),
            label: "Transactions",
          ),
        ],
      ),
      body: pages[currentIndex],
    );
  }
}
