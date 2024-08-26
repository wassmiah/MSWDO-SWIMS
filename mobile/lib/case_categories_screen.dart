import 'package:flutter/material.dart';
import 'package:swims/case_list_screen.dart';
import 'package:swims/custom_app_bar.dart';  // Ensure this import

class CaseCategoriesScreen extends StatelessWidget {
  final void Function(Map<String, dynamic>) onAddCase;

  CaseCategoriesScreen({required this.onAddCase});

  void _navigateToCaseList(BuildContext context, String category) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CaseListScreen(category: category, onAddCase: onAddCase),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Case Categories'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildCategoryCard(
              context,
              'Victim Survivors',
              'assets/category.jpg',
            ),
            _buildCategoryCard(
              context,
              'Children in Conflict with the Law',
              'assets/category.jpg',
            ),
            _buildCategoryCard(
              context,
              'Person Who Used Drugs',
              'assets/category.jpg',
            ),
            _buildCategoryCard(
              context,
              'Special Cases',
              'assets/category.jpg',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryCard(
      BuildContext context, String title, String imagePath) {
    return InkWell(
      onTap: () {
        _navigateToCaseList(context, title);
      },
      child: Card(
        color: Colors.orange, // Set the card color to orange
        margin: EdgeInsets.symmetric(vertical: 8),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              Image.asset(
                imagePath,
                width: 50,
                height: 50,
              ),
              SizedBox(width: 20),
              Text(
                title,
                style: TextStyle(fontSize: 18),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
